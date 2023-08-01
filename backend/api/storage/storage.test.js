
const request = require('supertest')
const app = require('../../app')
// const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

const {getAllFileMetadata, getFileMetadata, STORAGE_DIR} = require('./storage.helpers')

const expectedAllFileMetadata = [
    {
        "fileCategory": "image",
        "filename": "img1.png",
        "filesize": 704076,
        "staticURL": "http://192.168.0.14:5000/api/download/img1.png",
        "uploadTimeEpochMs": 1690260047003.4119,
    },
    {
        "fileCategory": "image",
        "filename": "img2.jpg",
        "filesize": 32567,
        "staticURL": "http://192.168.0.14:5000/api/download/img2.jpg",
        "uploadTimeEpochMs": 1690260047004.4124,
    },
    {
        "fileCategory": "app",
        "filename": "setup-env-files.js",
        "filesize": 1993,
        "staticURL": "http://192.168.0.14:5000/api/download/setup-env-files.js",
        "uploadTimeEpochMs": 1690260047004.4124,
    },
    {
        "fileCategory": "text",
        "filename": "text-upload_1686708193.txt",
        "filesize": 50,
        "staticURL": "http://192.168.0.14:5000/api/download/text-upload_1686708193.txt",
        "uploadTimeEpochMs": 1690260047005.4138,
    }
]

async function getFileContentsViaAPI(filename) {
    return await request(app)
            .get("/api/download/" + filename)
            .then(res => res.text)
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

beforeAll(async () => {
    // create and empty test storage dir
    // copy files from test artifacts   
    fse.emptyDirSync(STORAGE_DIR)
    initialFilenames.forEach((filename) => {
        fse.copyFileSync(
            path.join(process.env.TEST_ARTIFACTS_DIR, filename),
            path.join(STORAGE_DIR, filename)
        )
    })
    
    
})

afterAll(() => {
    // remove test storage dir files
})


describe('The initial test files have valid metadata', () => {
    test('that all test files exist', async () => {
        expect(getAllFileMetadata()).toHaveLength(expectedAllFileMetadata.length)
    })
    
    test('that a test file has correctly formatted metadata', async () => {
        expect(getFileMetadata(["img1.png"]))
        .toEqual(
            expect.objectContaining([expectedFileMetadataObj])
        )
    })
})


describe("downloading file", () => {
    
    test("that a test file's contents are identical between the API endpoint and directly reading from disk", async () => {
        const filename = "text-upload_1686708193.txt"
        const filepath = path.join(STORAGE_DIR, filename)
        expect(await getFileContentsViaAPI(filename))
        .toEqual(getFileContentsViaFileSystem(filepath))
    })

})

describe("uploading text and files", () => {
    const expectedTextData = "<<expected text file contents>>"
    const jsonFilename = "upload-test-1.json"

    test('uploads the text content and file successfully', async () => {
        const res = await request(app)  
            .post("/api/upload")
            .field("uploaded_text", expectedTextData)
            .attach("uploaded_files", path.join(process.env.TEST_ARTIFACTS_DIR, jsonFilename)) 
       
        // server thinks the upload was a success
        expect(res.statusCode).toEqual(200)

        //  text data was uploaded and is retrievable
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

        // uploaded file was uploaded and is retrievable
        const jsonFilepath = path.join(STORAGE_DIR, jsonFilename)
        expect(await getFileContentsViaAPI(jsonFilename))
        .toEqual(getFileContentsViaFileSystem(jsonFilepath))
    })
})

