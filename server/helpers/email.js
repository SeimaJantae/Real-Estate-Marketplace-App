import * as config from "../config.js";

const style = `
    background: #eee;
    padding: 20px;
`;
export const emailTemplate = (email, content, replyTo, subject) => {
  return {
    Source: config.EMAIL_FROM,
    Destination: {
      ToAddresses: [email], // In production use: req.body.email
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
              <html>
                <div style="${style}">
                    <h1 style = "${style}">Welcome to Real Estate App</h1>
                    ${content}
                    <p>&copy; ${new Date().getFullYear()}</p>
                </div>
              </html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };
};
