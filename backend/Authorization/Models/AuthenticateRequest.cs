﻿using System.ComponentModel.DataAnnotations;

namespace backend.Authorization.Models;
public class AuthenticateRequest
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}