package com.setec.backend.Enum;

public enum PermissionType {
    // User Management
    USER_CREATE("Create Users", "users", "create"),
    USER_READ("Read Users", "users", "read"),
    USER_UPDATE("Update Users", "users", "update"),
    USER_DELETE("Delete Users", "users", "delete"),
    USER_LIST("List Users", "users", "list"),
    
    // Admin Management
    ADMIN_CREATE("Create Admin", "admins", "create"),
    ADMIN_READ("Read Admin", "admins", "read"),
    ADMIN_UPDATE("Update Admin", "admins", "update"),
    ADMIN_DELETE("Delete Admin", "admins", "delete"),
    ADMIN_LIST("List Admins", "admins", "list"),
    
    // Hospital Management
    HOSPITAL_CREATE("Create Hospital", "hospitals", "create"),
    HOSPITAL_READ("Read Hospital", "hospitals", "read"),
    HOSPITAL_UPDATE("Update Hospital", "hospitals", "update"),
    HOSPITAL_DELETE("Delete Hospital", "hospitals", "delete"),
    HOSPITAL_LIST("List Hospitals", "hospitals", "list"),
    
    // Blood Donation Management
    DONATION_CREATE("Create Donation", "donations", "create"),
    DONATION_READ("Read Donation", "donations", "read"),
    DONATION_UPDATE("Update Donation", "donations", "update"),
    DONATION_DELETE("Delete Donation", "donations", "delete"),
    DONATION_LIST("List Donations", "donations", "list"),
    DONATION_APPROVE("Approve Donation", "donations", "approve"),
    DONATION_REJECT("Reject Donation", "donations", "reject"),
    
    // Donation Queue Management
    QUEUE_CREATE("Create Queue", "queue", "create"),
    QUEUE_READ("Read Queue", "queue", "read"),
    QUEUE_UPDATE("Update Queue", "queue", "update"),
    QUEUE_DELETE("Delete Queue", "queue", "delete"),
    QUEUE_LIST("List Queue", "queue", "list"),
    
    // Report & Analytics
    REPORT_VIEW("View Reports", "reports", "view"),
    ANALYTICS_VIEW("View Analytics", "analytics", "view"),
    EXPORT_DATA("Export Data", "exports", "export"),
    
    // System Management
    SYSTEM_CONFIG("System Configuration", "system", "config"),
    USER_AUDIT("User Audit", "audit", "view"),
    LOGS_VIEW("View Logs", "logs", "view"),
    BACKUP_MANAGE("Manage Backups", "backups", "manage");
    
    private final String description;
    private final String resourceName;
    private final String action;

    PermissionType(String description, String resourceName, String action) {
        this.description = description;
        this.resourceName = resourceName;
        this.action = action;
    }

    public String getDescription() {
        return description;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getAction() {
        return action;
    }

    public String getDisplayName() {
        return this.name().replace("_", " ");
    }
}
