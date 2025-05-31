package com.backend.projectbackend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {

    private final String uploadDir = "uploads"; // Carpeta donde se guardan los archivos

    public String uploadFile(MultipartFile file) throws IOException {
        // Crea la carpeta si no existe
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // Guarda el archivo con su nombre original
        Path filePath = Paths.get(uploadDir, file.getOriginalFilename());
        Files.write(filePath, file.getBytes());

        // Retorna la ruta relativa o el nombre del archivo
        return file.getOriginalFilename();
    }

    public byte[] downloadFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir, fileName);
        return Files.readAllBytes(filePath);
    }

    public void deleteFile(String fileName) throws IOException {
        Path filePath = Paths.get(uploadDir, fileName);
        Files.deleteIfExists(filePath);
    }


    public boolean fileExists(String fileName) {
        Path filePath = Paths.get(uploadDir, fileName);
        return Files.exists(filePath);
    }
}
