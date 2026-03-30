package com.crm.service;

import com.crm.model.WhatsAppConnection;
import com.crm.model.Company;
import com.crm.repository.WhatsAppConnectionRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class WhatsAppService {
    
    private final WhatsAppConnectionRepository whatsAppConnectionRepository;
    
    @Value("${whatsapp.api-url}")
    private String whatsappApiUrl;
    
    @Value("${whatsapp.access-token}")
    private String whatsappAccessToken;
    
    public WhatsAppConnection createConnection(Company company, String phoneNumber, String businessAccountId, String accessToken) {
        WhatsAppConnection connection = new WhatsAppConnection();
        connection.setCompany(company);
        connection.setPhoneNumber(phoneNumber);
        connection.setBusinessAccountId(businessAccountId);
        connection.setAccessToken(accessToken);
        connection.setStatus("ACTIVE");
        
        WhatsAppConnection saved = whatsAppConnectionRepository.save(connection);
        
        // Gerar QR Code
        String qrCode = generateQRCode(phoneNumber);
        saved.setQrCode(qrCode);
        
        return whatsAppConnectionRepository.save(saved);
    }
    
    public String generateQRCode(String phoneNumber) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(
                    "https://wa.me/" + phoneNumber,
                    BarcodeFormat.QR_CODE,
                    300,
                    300
            );
            
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            
            byte[] qrCodeImage = outputStream.toByteArray();
            return "data:image/png;base64," + Base64.getEncoder().encodeToString(qrCodeImage);
        } catch (Exception e) {
            log.error("Erro ao gerar QR Code", e);
            throw new RuntimeException("Erro ao gerar QR Code", e);
        }
    }
    
    public List<WhatsAppConnection> getConnectionsByCompany(Company company) {
        return whatsAppConnectionRepository.findByCompany(company);
    }
    
    public WhatsAppConnection getConnectionByPhoneNumber(String phoneNumber) {
        return whatsAppConnectionRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new RuntimeException("WhatsApp connection not found"));
    }
    
    public void deleteConnection(Long connectionId) {
        whatsAppConnectionRepository.deleteById(connectionId);
    }
    
    public void sendMessage(String phoneNumber, String message) {
        WhatsAppConnection connection = getConnectionByPhoneNumber(phoneNumber);
        
        try {
            // Aqui você implementaria a chamada para a API do WhatsApp
            // Exemplo usando RestTemplate ou WebClient
            log.info("Enviando mensagem para {} via WhatsApp", phoneNumber);
            
            // TODO: Implementar chamada real para WhatsApp Business API
        } catch (Exception e) {
            log.error("Erro ao enviar mensagem WhatsApp", e);
            throw new RuntimeException("Erro ao enviar mensagem", e);
        }
    }
}
