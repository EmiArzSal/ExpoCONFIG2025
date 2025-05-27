package com.backend.projectbackend.util.email;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${frontend.url}")
    private String frontendUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendConfirmationEmail(String email, String name, String token) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("admin@ClockTrain.com", "ClockTrain");
        helper.setTo(email);
        helper.setSubject("ClockTrain - Confirm your email");

        String htmlContent = "<div style='background:#f8fafc;padding:32px 0;min-height:100vh;'>" +
                            "<div style='max-width:420px;margin:40px auto;background:#fff;border-radius:12px;box-shadow:0 2px 12px #0001;padding:32px 24px;'>" +
                                "<h2 style='font-family:Arial,sans-serif;color:#2563eb;text-align:center;margin-bottom:16px;'>¡Hola, <span style='font-weight:600;'>" + name + "</span>!</h2>" +
                                "<p style='font-family:sans-serif;text-align:center;font-size:16px;margin-bottom:24px;'>Por favor confirma tu correo dando clic en el botón:</p>" + "<div style='text-align:center;'>"+"<a href=\"" + frontendUrl + "/auth/confirm-account?token=" + token + "\" " + "style='font-family:Arial display:inline-block;margin:0 auto 24px auto;padding:12px 32px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;border-radius:8px;font-size:16px;box-shadow:0 1px 4px #2563eb33;'>Confirmar correo</a>"+"</div>" + "<div style='margin:24px 0;text-align:center;'>" + "</div>" + "<p style='font-family:sans-serif;text-align:center;color:#64748b;font-size:14px;'>Este token expirará en 1 hora.</p>" + 
                                "</div>" + "<p style='text-align:center;color:#94a3b8;font-size:12px;margin-top:32px;'>ClockTrain &copy; 2024</p>" + "</div>";

        helper.setText(htmlContent, true); // true = HTML content

        mailSender.send(message);

        System.out.println("Confirmation email sent to: " + email);
    }

    public void sendResetPasswordEmail(String email, String name, String token) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("admin@ClockTrain.com", "ClockTrain");
        helper.setTo(email);
        helper.setSubject("ClockTrain - Reset your password");

        String htmlContent = "<p>Hello: <strong>" + name + "</strong>,</p>"
                + "<p>We received a request to reset your password.</p>"
                + "<p>Please click the link below to reset it:</p>"
                + "<p><a href=\"" + frontendUrl + "/auth/reset-password\">Reset Password</a></p>"
                + "<p>And use the following reset code: <b>" + token + "</b></p>"
                + "<p>This token will expire in 1 hour.</p>";

        helper.setText(htmlContent, true); // true = HTML content

        mailSender.send(message);

        System.out.println("Password reset email sent to: " + email);
    }
}