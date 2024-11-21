# Overview

This repository contains a Node.js-based AWS Lambda function that sends email verification messages using AWS SNS and SendGrid. The function generates a verification link and sends it to the user's email address upon receiving an event from an SNS topic.

## Features

- **AWS SNS Integration**: Listens to messages published to an SNS topic.
- **Email Verification**: Sends a verification email containing a secure link.
- **Environment Variable Support**: Configurable with `dotenv` for flexibility and security.
- **Error Handling**: Comprehensive logging for monitoring and debugging.

## Requirements

### Prerequisites

- AWS Account
- SendGrid Account
- Verified domain or email in SendGrid
- Node.js and npm installed locally
- AWS CLI installed and configured

### Dependencies

This project uses the following npm packages:
- `dotenv`: For managing environment variables.
- `@sendgrid/mail`: For sending emails via the SendGrid API.

---

## Author

**Mathesh Ramesh**

