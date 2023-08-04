
//const request = require('supertest')
//const { agent } = require('supertest')
const needle = require('needle')
const app = require('../../app')
const fse = require('fs-extra')
const path = require('path')
const {promisify} = require('util')
const EventSource = require('eventsource')

const FormData = require('form-data')

const {getAllFileMetadata, getFileMetadata, STORAGE_DIR} = require('./storage.helpers')

// debug: this is an example of how the test_storage_dir should appear after it is created and filled with files
// const expectedAllFileMetadata = [
//     {
//         "fileCategory": "image",
//         "filename": "img1.png",
//         "filesize": 704076,
//         "staticURL": "http://192.168.0.14:5000/api/download/img1.png",
//         "uploadTimeEpochMs": 1690260047003.4119,
//     },
//     {
//         "fileCategory": "image",
//         "filename": "img2.jpg",
//         "filesize": 32567,
//         "staticURL": "http://192.168.0.14:5000/api/download/img2.jpg",
//         "uploadTimeEpochMs": 1690260047004.4124,
//     },
//     {
//         "fileCategory": "app",
//         "filename": "setup-env-files.js",
//         "filesize": 1993,
//         "staticURL": "http://192.168.0.14:5000/api/download/setup-env-files.js",
//         "uploadTimeEpochMs": 1690260047004.4124,
//     },
//     {
//         "fileCategory": "text",
//         "filename": "text-upload_1686708193.txt",
//         "filesize": 50,
//         "staticURL": "http://192.168.0.14:5000/api/download/text-upload_1686708193.txt",
//         "uploadTimeEpochMs": 1690260047005.4138,
//     }
// ]

async function getFileContentsViaAPI(filename) {
    // https://www.npmjs.com/package/needle#user-content-response-options
    // this function is to get the raw contents of the file via the API, so any parsing will occur later
    return needle('GET', u(`/api/download/${filename}`), {parse_response: false}).then(res => {return res.body})
}

function getFileContentsViaFileSystem(filepath){
    return fse.readFileSync(
        filepath, 
        {encoding: "utf-8"}
    )
}

const expectedFileMetadataObj = {
    "fileCategory": expect.any(String),
    "filename": expect.any(String),
    "filesize": expect.any(Number),
    "staticURL": expect.stringMatching(new RegExp("https?://")), 
    "uploadTimeEpochMs": expect.any(Number)
}
const initialFilenames = ["img1.png", "img2.jpg","setup-env-files.js","text-upload_1686708193.txt"]    

var httpServer

// // create full path
const u = path => process.env.BACKEND_URL + path

var testSSEClient1

beforeAll((done) => {
    // create and empty test storage dir
    // copy files from test artifacts       
    fse.emptyDirSync(STORAGE_DIR)
    initialFilenames.forEach((filename) => {
        fse.copyFileSync(
            path.join(process.env.TEST_ARTIFACTS_DIR, filename),
            path.join(STORAGE_DIR, filename)
        )
    })

    // starts the server
    httpServer = app.listen(process.env.BACKEND_PORT, process.env.PRIVATE_IP_ADDR, () => {
        console.log(`Backend test server started at ${process.env.BACKEND_URL}`);
    })
    

    testSSEClient1 = new EventSource(u("/api/file-events"))
    testSSEClient1.onopen = () => {done()}
})


afterAll(async () => {
    // shuts down the test server
    // https://stackoverflow.com/questions/14626636/how-do-i-shutdown-a-node-js-https-server-immediately

    testSSEClient1.close()
    //httpServer.emit('close')
    httpServer.close()
})  




describe('The initial test files have valid metadata', () => {
    test('that all test files exist', async () => {
        expect(getAllFileMetadata()).toHaveLength(initialFilenames.length)
    })
    
    test('that a test file has correctly formatted metadata', async () => {
        expect(getFileMetadata(["img1.png"]))
        .toEqual(
            expect.objectContaining([expectedFileMetadataObj])
        )
    })
})

describe("downloading file", () => {
    test("the stored file has the same contents when retrieved via the API", async () => {
        const filename = "text-upload_1686708193.txt"
        const filepath = path.join(STORAGE_DIR, filename)
        expect(await getFileContentsViaAPI(filename))
        .toEqual(getFileContentsViaFileSystem(filepath))
    })
})

describe("uploads the text content and file successfully", () => {
    const expectedTextData = "<<expected text file contents>>"
    const jsonFilename = "upload-test-1.json"

    test('upload endpoint returns an OK response', async () => {
        // const formData = new FormData();
        // formData.append('uploaded_text', expectedTextData)
        // formData.append('uploaded_files', fse.createReadStream(path.join(process.env.TEST_ARTIFACTS_DIR, jsonFilename)))
        

        postData = {
            'uploaded_text': expectedTextData,
            'uploaded_files': {
                file: path.join(process.env.TEST_ARTIFACTS_DIR, jsonFilename),
                content_type: 'application/json'
            }
        }

        await needle("POST", u("/api/upload"), postData, {multipart: true})
            .then((res) => expect(res.statusCode).toEqual(200))
    })

    test("text data was stored correctly and is retrievable via the API", async () => {
        //      the filename is autogenerated, so we find the most recent file 
        //      with the format "text-upload_EPOCHDATE" and validate its contents
        
        const currentAllFileMetadata = getAllFileMetadata()
        const textUploadFilename = currentAllFileMetadata
                                                .sort((a,b) => b.uploadTimeEpochMs - a.uploadTimeEpochMs)
                                                .at(0)
                                                .filename
        const textUploadFilepath = path.join(STORAGE_DIR, textUploadFilename)
        expect(await(getFileContentsViaAPI(textUploadFilename)))
            .toEqual(getFileContentsViaFileSystem(textUploadFilepath))
    })

     // text data was uploaded and is retrievable
    test("uploaded file was stored correctly and is retrievable via the API", async () => {
        // uploaded file was uploaded and is retrievable
        const jsonFilepath = path.join(STORAGE_DIR, jsonFilename)
        expect(await getFileContentsViaAPI(jsonFilename))
            .toEqual(getFileContentsViaFileSystem(jsonFilepath))
    })

})


describe("deleting a file", () => {
    const filename = "img2.jpg"
    const filepath = path.join(STORAGE_DIR, filename)

    test("the file exists at the beginning of the test", () => {
        expect(fse.pathExistsSync(filepath)).toBe(true)
    })

    test("delete endpoint returns an OK response", async () => {
        await needle('DELETE', u('/api/delete'), {"filename": filename }, { json: true })
        .then(res => expect(res.statusCode).toEqual(200))
    })

    test("file no longer exists", () => {
        expect(fse.pathExistsSync(filepath)).toBe(false)
    })
})

