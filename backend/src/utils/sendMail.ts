import nodemailer, { Transporter } from 'nodemailer';


// Define an interface for the options parameter
interface mailOptions {
    email: string;
    subject: string;
    text: string;
}


const sendMail = async (options : mailOptions) : Promise<void> => {
    // Create the transporter with proper typings
    const transporter : Transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: Number(process.env.SMTP_PORT),  // Convert to number since env vars are strings
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        
    });

    // Define the mail options
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.email,
        subject: options.subject,
        text: options.text,
    }

    try {
        const result = await transporter.sendMail(mailOptions)
        console.log('Email sent:', result.response)
    } catch (error) {
        console.error('Error sending mail:', error)
    };

        
}

export default sendMail;