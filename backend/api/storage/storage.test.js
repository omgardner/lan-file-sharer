
const request = require('supertest')
const app = require('../../app')
const fs = require('fs/promises')
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

const expectedFileMetadataObj = {
    "fileCategory": expect.any(String),
    "filename": expect.any(String),
    "filesize": expect.any(Number),
    "staticURL": expect.stringMatching(new RegExp("https?://")), 
    "uploadTimeEpochMs": expect.any(Number)
}

// beforeall copy testing artifacts to test_storage_directory
// afterall delete contents of test_storage_directory
    
beforeAll(async () => {
    // create and empty test storage dir
    // copy files from test artifacts   
    
})

afterAll(() => {
    // remove test storage dir files
})


describe('The initial test files have valid metadata', () => {
    test('that all test files exist', async () => {
        expect(await getAllFileMetadata()).toHaveLength(expectedAllFileMetadata.length)
    })
    
    test('that a test file has correctly formatted metadata', async () => {
        expect(await getFileMetadata(["img1.png"]))
        .toEqual(
            expect.objectContaining([expectedFileMetadataObj])
        )
    })
})


describe("downloading file", () => {
    const filename = "text-upload_1686708193.txt"
    test("that a test file's contents are identical between the API endpoint and directly reading from disk", async () => {
        const expectedFileText = await fs.readFile(path.join(STORAGE_DIR, filename), "utf-8")
        const actualFileText = await request(app)
            .get("/api/download/" + filename)
            .then(res => res.text)
        
        expect(actualFileText).toEqual(expectedFileText)
    })

})

describe("uploading text and files", () => {
    const expectedTextData = "<<expected text file contents>>"
    const expectedJsonDeserialised = {
        "keyA": "valA",
        "keyB": 10
    }

    const jsonFilename = "testing-json-file.json"
    const jsonFile = new Blob([JSON.stringify(expectedJsonDeserialised)])
    jsonFile.filename = jsonFilename

    test('uploads the text content and file successfully', async () => {
        const res = await request(app)  
            .post("/api/upload")
            .field("uploaded_text", expectedTextData)
            .field("test2", "hi there") // todo: send jsonFile as well.
        
        // server says it was successful
        expect(res.statusCode).toEqual(200)

        console.log(await getAllFileMetadata())

        // json file shown in metadata
        // text content
        //      most recent text upload shown in metadata
        //      contains the original text
        

        // todo check for text file with autogenerated name

        // console.log(expectedFileMetadataObj)
        // // the file is found on the server, implied by the returned metadata
        // expect(await getFileMetadataMeta(jsonFilename).toEqual(
        //     expect.objectContaining(expectedFileMetadataObj)
        // ))
    })
})

