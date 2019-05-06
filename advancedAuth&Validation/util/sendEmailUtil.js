//NOTE SEND email setup
var helper = require('sendgrid').mail;
//api key
var sg = require('sendgrid')('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');


module.exports.sendmail=((to, mailSubject,  contentBody,contentTag='text/html') => {
    //NOTE INIT EMAIl
    const fromEmail = new helper.Email('MyNoodEmailTest-NoReplay@noder.com');
    const toEmail = new helper.Email(to);
    const subject = mailSubject;
    const content = new helper.Content(contentTag, contentBody);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    const request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return sg.API(request)

})