CREATE TABLE `users` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text,
	`deleted_at` text
);
