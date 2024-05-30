CREATE TABLE `user_providers` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`injector_id` text NOT NULL,
	`type` text NOT NULL,
	`sub` text NOT NULL,
	`email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_providers_injector_id_and_type_ux` ON `user_providers` (`injector_id`,`type`);