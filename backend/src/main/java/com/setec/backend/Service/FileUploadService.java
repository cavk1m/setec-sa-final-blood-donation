package com.setec.backend.Service;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileUploadService {
    
    private static final Logger log = LoggerFactory.getLogger(FileUploadService.class);
    
    @Value("${file.upload-dir:uploads}")
    private String uploadDir;
    
    @Value("${file.max-size:5242880}") // 5MB default
    private long maxFileSize;
    
    // Allowed image extensions
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");
    
    // Allowed content types
    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
        "image/jpeg", "image/jpg", "image/png", "image/gif"
    );
    
    /**
     * Upload profile picture for user
     */
    public String uploadProfilePicture(MultipartFile file, UUID userId) {
        validateFile(file);
        
        try {
            // Create uploads directory if it doesn't exist
            Path uploadPath = createUploadDirectory("profiles");
            
            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = FilenameUtils.getExtension(originalFilename);
            String fileName = "profile_" + userId + "_" + System.currentTimeMillis() + "." + extension;
            
            // Full path for the file
            Path filePath = uploadPath.resolve(fileName);
            
            // Save the file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Return relative path for database storage
            String relativePath = "profiles/" + fileName;
            log.info("Profile picture uploaded successfully: {}", relativePath);
            
            return relativePath;
            
        } catch (IOException e) {
            log.error("Failed to upload profile picture for user {}: {}", userId, e.getMessage());
            throw new RuntimeException("Failed to upload profile picture", e);
        }
    }
    
    /**
     * Delete profile picture file
     */
    public boolean deleteProfilePicture(String relativePath) {
        if (relativePath == null || relativePath.trim().isEmpty()) {
            return true; // Nothing to delete
        }
        
        try {
            Path filePath = Paths.get(uploadDir).resolve(relativePath);
            
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                log.info("Profile picture deleted successfully: {}", relativePath);
                return true;
            } else {
                log.warn("Profile picture file not found: {}", relativePath);
                return false;
            }
            
        } catch (IOException e) {
            log.error("Failed to delete profile picture {}: {}", relativePath, e.getMessage());
            return false;
        }
    }
    
    /**
     * Get full path for serving files
     */
    public Path getFilePath(String relativePath) {
        return Paths.get(uploadDir).resolve(relativePath);
    }
    
    /**
     * Check if file exists
     */
    public boolean fileExists(String relativePath) {
        if (relativePath == null || relativePath.trim().isEmpty()) {
            return false;
        }
        
        Path filePath = Paths.get(uploadDir).resolve(relativePath);
        return Files.exists(filePath);
    }
    
    /**
     * Get file size in bytes
     */
    public long getFileSize(String relativePath) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(relativePath);
            return Files.size(filePath);
        } catch (IOException e) {
            log.error("Failed to get file size for {}: {}", relativePath, e.getMessage());
            return 0;
        }
    }
    
    /**
     * Create upload directory structure
     */
    private Path createUploadDirectory(String subDirectory) throws IOException {
        Path uploadPath = Paths.get(uploadDir, subDirectory);
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
            log.info("Created upload directory: {}", uploadPath);
        }
        
        return uploadPath;
    }
    
    /**
     * Validate uploaded file
     */
    private void validateFile(MultipartFile file) {
        // Check if file is empty
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        
        // Check file size
        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size exceeds maximum allowed size of " + (maxFileSize / 1024 / 1024) + "MB");
        }
        
        // Check file extension
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            throw new IllegalArgumentException("Invalid file name");
        }
        
        String extension = FilenameUtils.getExtension(originalFilename).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("File type not allowed. Allowed types: " + String.join(", ", ALLOWED_EXTENSIONS));
        }
        
        // Check content type
        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Invalid file content type. Allowed types: " + String.join(", ", ALLOWED_CONTENT_TYPES));
        }
        
        log.info("File validation passed for: {}", originalFilename);
    }
    
    /**
     * Clean up old profile picture before uploading new one
     */
    public void cleanupOldProfilePicture(String oldRelativePath) {
        if (oldRelativePath != null && !oldRelativePath.trim().isEmpty()) {
            deleteProfilePicture(oldRelativePath);
        }
    }
}