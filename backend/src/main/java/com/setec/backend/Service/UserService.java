package com.setec.backend.Service;

import com.setec.backend.Model.users;
import java.util.List;
import java.util.UUID;

public interface UserService {
    users createUser(users user);
    users getUserById(UUID id);
    users getUserByEmail(String email);
    List<users> getAllUsers();
    users updateUser(UUID id, users user);
    void deleteUser(UUID id);
    boolean existsByEmail(String email);
}