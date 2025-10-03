 FAIL  src/tests/youtube.test.ts (10.077 s)
  ● Console

    console.log
      Login attempt for email: youtube@example.com

      at src/controllers/authController.ts:78:11

    console.log
      Provided password: password123

      at src/controllers/authController.ts:79:11

    console.log
      User found by email: {
        id: 19,
        username: 'youtubeuser',
        email: 'youtube@example.com',
        password: '$2b$10$v6qX16tjiqMWBGE3ZCHrPO.EbTzQe/XdAlXv7B8JbY/jBgf0JjTzu',
        created_at: 2025-10-03T06:23:40.000Z,
        updated_at: 2025-10-03T06:23:40.000Z
      }

      at src/controllers/authController.ts:87:13

    console.log
      Password match result: true

      at src/controllers/authController.ts:95:13

    console.error
      EXEC ERROR audioStream.pipe is not a function

      1 | export const error = (...args: any[]) => {
    > 2 |   console.error("EXEC ERROR", ...args);
        |           ^
      3 | };
      4 |

      at error (src/utils/logger.ts:2:11)
      at src/controllers/trackController.ts:53:16
      at fulfilled (src/controllers/trackController.ts:38:58)

  ● YouTube Stream Integration › should stream audio from a YouTube URL
                                                                                                                                                                                                                               
    expect(received).toEqual(expected) // deep equality                                                                                                                                                                        
                                                                                                                                                                                                                               
    Expected: 200                                                                                                                                                                                                              
    Received: 500                                                                                                                                                                                                              
                                                                                                                                                                                                                               
      43 |       .get(`/api/tracks/stream?url=${encodeURIComponent(youtubeUrl)}`)                                                                                                                                              
      44 |       .set('Authorization', `Bearer ${token}`);
    > 45 |     expect(res.statusCode).toEqual(200);
         |                            ^
      46 |     expect(res.headers['content-type']).toMatch(/audio/);
      47 |   });
      48 |

      at src/tests/youtube.test.ts:45:28
      at fulfilled (src/tests/youtube.test.ts:5:58)