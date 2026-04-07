package com.setec.backend.Repository;

import com.setec.backend.Model.otp_codes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OtpRepository extends JpaRepository<otp_codes, UUID> {
    
    /**
     * Find the latest OTP for a contact that hasn't been verified yet
     */
    @Query("SELECT o FROM otp_codes o WHERE o.contact = :contact AND o.verified = false ORDER BY o.expires_at DESC LIMIT 1")
    Optional<otp_codes> findLatestUnverifiedByContact(@Param("contact") String contact);
    
    /**
     * Find OTP by contact and code that is not expired and not verified (SAFE VERSION)
     */
    @Query("SELECT o FROM otp_codes o WHERE o.contact = :contact AND o.otp_code = :otpCode AND o.verified = false AND o.expires_at > :now")
    Optional<otp_codes> findValidOtpByContactAndCodeSafe(@Param("contact") String contact, 
                                                         @Param("otpCode") String otpCode, 
                                                         @Param("now") LocalDateTime now);
    
    /**
     * Find OTP by contact and code that is not expired and not verified (ORIGINAL - may have UUID issues)
     */
    @Query("SELECT o FROM otp_codes o WHERE o.contact = :contact AND o.otp_code = :otpCode AND o.verified = false AND o.expires_at > :now")
    Optional<otp_codes> findValidOtpByContactAndCode(@Param("contact") String contact, 
                                                     @Param("otpCode") String otpCode, 
                                                     @Param("now") LocalDateTime now);
    
    /**
     * Find all expired OTPs
     */
    @Query("SELECT o FROM otp_codes o WHERE o.expires_at < :now")
    List<otp_codes> findExpiredOtps(@Param("now") LocalDateTime now);
    
    /**
     * Delete expired OTPs
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM otp_codes o WHERE o.expires_at < :now")
    int deleteExpiredOtps(@Param("now") LocalDateTime now);
    
    /**
     * Find and verify OTP using native SQL to bypass UUID casting issues
     */
    @Query(value = "SELECT * FROM otp_codes WHERE contact = ?1 AND otp_code = ?2 AND verified = false AND expires_at > ?3 LIMIT 1", nativeQuery = true)
    Optional<otp_codes> findValidOtpNative(String contact, String otpCode, LocalDateTime now);
    
    /**
     * Mark OTP as verified using native SQL to bypass UUID casting issues
     */
    @Modifying
    @Transactional  
    @Query(value = "UPDATE otp_codes SET verified = true WHERE contact = ?1 AND otp_code = ?2 AND verified = false", nativeQuery = true)
    int markOtpAsVerifiedNative(String contact, String otpCode);
    
    /**
     * Count unverified OTPs for a contact within time range (for rate limiting)
     */
    @Query("SELECT COUNT(o) FROM otp_codes o WHERE o.contact = :contact AND o.verified = false AND o.expires_at > :since")
    long countUnverifiedOtpsSince(@Param("contact") String contact, @Param("since") LocalDateTime since);
    
    /**
     * Delete all OTPs for a contact
     */
    @Modifying
    @Transactional
    void deleteByContact(String contact);
}