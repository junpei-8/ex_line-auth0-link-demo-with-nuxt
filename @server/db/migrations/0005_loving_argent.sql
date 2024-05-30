ALTER TABLE `user_providers` RENAME TO `user_auth_providers`;--> statement-breakpoint
DROP INDEX IF EXISTS `user_providers_injector_id_and_type_ux`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_auth_providers_injector_id_and_type_ux` ON `user_auth_providers` (`injector_id`,`type`);