// Import required AWS SDK modules for SNS (Simple Notification Service)
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

// Asynchronous function to send an email message using AWS SNS
async function sendEmailMessage(sns, params) {
    // Create a new PublishCommand with the specified parameters
    const command = new PublishCommand({
        ...params,
        MessageStructure: 'json',
        Message: JSON.stringify({
            default: params.Message,
            email: JSON.stringify({
                Subject: 'OTP Code',
                Body: params.Message
            })
        })
    });
    
    // Send the email message using the SNS client and the created command
    const message = await sns.send(command);
    
    // Return the result of the message sending operation
    return message;
}

// Main asynchronous function (IIFE) to send an email message
(async () => {
    // Define parameters for the email message
    const params = {
        Message: `Your OTP code is: ${Math.random().toString().substring(2, 10)}`, // Generate a 6-digit OTP code
        //TopicArn: 'arn:aws:sns:eu-north-1:851725489597:prac7sns' // SNS topic ARN for sending emails
        PhoneNumber: 'yagnapatelhirenk@gmail.com'
    };

    // Create an SNS client with the specified configuration
    const sns = new SNSClient({
        region: 'us-east-1', // AWS region
        credentials: {
            accessKeyId: 'AKIA4MTWLSW672RZAR5U', // AWS access key
            secretAccessKey: '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' // AWS secret key
        }
    });

    // Send the email message using the defined SNS client and parameters
    await sendEmailMessage(sns, params);
})();
