package com.setec.backend.Service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.io.TempDir;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FileUploadServiceTest {
    
    @TempDir
    Path tempDir;
    
    @Mock
    private MultipartFile mockFile;
    
    private FileUploadService fileUploadService;
    private UUID testUserId;
    
    @BeforeEach
    void setUp() {
        fileUploadService = new FileUploadService();
        testUserId = UUID.randomUUID();
        
        // Set up the upload directory to use temp directory
        ReflectionTestUtils.setField(fileUploadService, "uploadDir", tempDir.toString());
        ReflectionTestUtils.setField(fileUploadService, "maxFileSize", 5242880L); // 5MB
    }
    
    @Test
    void uploadProfilePicture_Success() throws IOException {
        // Given
        String filename = "test-image.jpg";
        String contentType = "image/jpeg";
        byte[] content = "test image content".getBytes();
        
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getSize()).thenReturn((long) content.length);
        when(mockFile.getOriginalFilename()).thenReturn(filename);
        when(mockFile.getContentType()).thenReturn(contentType);
        when(mockFile.getInputStream()).thenReturn(new ByteArrayInputStream(content));
        
        // When
        String result = fileUploadService.uploadProfilePicture(mockFile, testUserId);
        
        // Then
        assertNotNull(result);
        assertTrue(result.startsWith("profiles/profile_" + testUserId));
        assertTrue(result.endsWith(".jpg"));
        
        // Verify file exists
        Path uploadedFile = tempDir.resolve(result);
        assertTrue(Files.exists(uploadedFile));
        assertEquals(content.length, Files.size(uploadedFile));
    }
    
    @Test
    void uploadProfilePicture_EmptyFile() {
        // Given
        when(mockFile.isEmpty()).thenReturn(true);
        
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
            () -> fileUploadService.uploadProfilePicture(mockFile, testUserId));
        
        assertEquals("File is empty", exception.getMessage());
    }
    
    @Test
    void uploadProfilePicture_FileSizeExceeded() {
        // Given
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getSize()).thenReturn(6000000L); // 6MB - exceeds 5MB limit
        
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
            () -> fileUploadService.uploadProfilePicture(mockFile, testUserId));
        
        assertTrue(exception.getMessage().contains("File size exceeds maximum"));
    }
    
    @Test
    void uploadProfilePicture_InvalidFileType() {
        // Given
        when(mockFile.isEmpty()).thenReturn(false);
        when(mockFile.getSize()).thenReturn(1000L);
        when(mockFile.getOriginalFilename()).thenReturn("test.txt");
        
        // When & Then
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
            () -> fileUploadService.uploadProfilePicture(mockFile, testUserId));
        
        assertTrue(exception.getMessage().contains("File type not allowed"));
    }
    
    @Test
    void deleteProfilePicture_Success() throws IOException {
        // Given
        String relativePath = "profiles/test_profile.jpg";
        Path testFile = tempDir.resolve(relativePath);
        Files.createDirectories(testFile.getParent());
        Files.write(testFile, "test content".getBytes());
        
        // When
        boolean result = fileUploadService.deleteProfilePicture(relativePath);
        
        // Then
        assertTrue(result);
        assertFalse(Files.exists(testFile));
    }
    
    @Test
    void deleteProfilePicture_FileNotFound() {
        // Given
        String relativePath = "profiles/nonexistent.jpg";
        
        // When
        boolean result = fileUploadService.deleteProfilePicture(relativePath);
        
        // Then
        assertFalse(result);
    }
    
    @Test
    void deleteProfilePicture_NullPath() {
        // When
        boolean result = fileUploadService.deleteProfilePicture(null);
        
        // Then
        assertTrue(result); // Should return true for null paths
    }
    
    @Test
    void deleteProfilePicture_EmptyPath() {
        // When
        boolean result = fileUploadService.deleteProfilePicture("");
        
        // Then
        assertTrue(result); // Should return true for empty paths
    }
    
    @Test
    void fileExists_True() throws IOException {
        // Given
        String relativePath = "profiles/existing.jpg";
        Path testFile = tempDir.resolve(relativePath);
        Files.createDirectories(testFile.getParent());
        Files.write(testFile, "test content".getBytes());
        
        // When
        boolean result = fileUploadService.fileExists(relativePath);
        
        // Then
        assertTrue(result);
    }
    
    @Test
    void fileExists_False() {
        // Given
        String relativePath = "profiles/nonexistent.jpg";
        
        // When
        boolean result = fileUploadService.fileExists(relativePath);
        
        // Then
        assertFalse(result);
    }
    
    @Test
    void getFileSize_Success() throws IOException {
        // Given
        String relativePath = "profiles/test.jpg";
        Path testFile = tempDir.resolve(relativePath);
        Files.createDirectories(testFile.getParent());
        byte[] content = "test file content".getBytes();
        Files.write(testFile, content);
        
        // When
        long size = fileUploadService.getFileSize(relativePath);
        
        // Then
        assertEquals(content.length, size);
    }
    
    @Test
    void getFilePath_Success() {
        // Given
        String relativePath = "profiles/test.jpg";
        
        // When
        Path result = fileUploadService.getFilePath(relativePath);
        
        // Then
        assertEquals(tempDir.resolve(relativePath), result);
    }
    
    @Test
    void cleanupOldProfilePicture_Success() throws IOException {
        // Given
        String relativePath = "profiles/old_profile.jpg";
        Path testFile = tempDir.resolve(relativePath);
        Files.createDirectories(testFile.getParent());
        Files.write(testFile, "old content".getBytes());
        
        // When
        fileUploadService.cleanupOldProfilePicture(relativePath);
        
        // Then
        assertFalse(Files.exists(testFile));
    }
    
    @Test
    void cleanupOldProfilePicture_NullPath() {
        // When & Then
        assertDoesNotThrow(() -> fileUploadService.cleanupOldProfilePicture(null));
    }
}