/*
-- Query: SELECT * FROM agl.ip_allow
LIMIT 0, 200

-- Date: 2020-08-17 07:24
*/

INSERT INTO `ip_allow`(`name`, `ipStart`, `ipEnd`) VALUES ('Bishwo Home', INET_ATON('149.167.94.71'), INET_ATON('149.167.94.71'));
Update ip_allow set `ipStart` = INET_ATON('183.87.122.24'),`ipEnd` = INET_ATON('183.87.122.24') where `ipID`='4';

INSERT INTO `ip_allow` (`ipID`,`name`,`status`,`ipStart`,`ipEnd`,`hostname`) VALUES (1,'localhost',1,0,0,'127.0.0.1');
INSERT INTO `ip_allow` (`ipID`,`name`,`status`,`ipStart`,`ipEnd`,`hostname`) VALUES (2,'localhost',1,2130706433,2130706433,'127.0.0.1');


/*
-- Query: SELECT * FROM agl.users where username in ('sys.adm','sys.adm1', 'sys.adm2', 'sys.adm3', 'sys.adm4', 'sys.adm5')
LIMIT 0, 200

-- Date: 2020-08-17 07:26
*/
INSERT INTO `users` (`username`,`password`,`status`,`alias`,`firstname`,`lastname`,`created`) VALUES ('sys.adm','$2y$10$YdR8JIGlzJR0zwtxknmG.OZRyvKw5FP5mRQ0S9mcQjgGdHpCqKXua',1,NULL,'System','Administrator','2016-06-03 00:26:14');
INSERT INTO `users` (`username`,`password`,`status`,`alias`,`firstname`,`lastname`,`created`) VALUES ('sys.adm1','$2y$10$YdR8JIGlzJR0zwtxknmG.OZRyvKw5FP5mRQ0S9mcQjgGdHpCqKXua',1,NULL,'System','Administrator','2016-06-03 00:26:14');
INSERT INTO `users` (`username`,`password`,`status`,`alias`,`firstname`,`lastname`,`created`) VALUES ('sys.adm2','$2y$10$YdR8JIGlzJR0zwtxknmG.OZRyvKw5FP5mRQ0S9mcQjgGdHpCqKXua',1,NULL,'System','Administrator','2016-06-03 00:26:14');
INSERT INTO `users` (`username`,`password`,`status`,`alias`,`firstname`,`lastname`,`created`) VALUES ('sys.adm3','$2y$10$YdR8JIGlzJR0zwtxknmG.OZRyvKw5FP5mRQ0S9mcQjgGdHpCqKXua',1,NULL,'System','Administrator','2016-06-03 00:26:14');
INSERT INTO `users` (`username`,`password`,`status`,`alias`,`firstname`,`lastname`,`created`) VALUES ('sys.adm4','$2y$10$YdR8JIGlzJR0zwtxknmG.OZRyvKw5FP5mRQ0S9mcQjgGdHpCqKXua',1,NULL,'System','Administrator','2016-06-03 00:26:14');
INSERT INTO `users` (`username`,`password`,`status`,`alias`,`firstname`,`lastname`,`created`) VALUES ('sys.adm5','$2y$10$YdR8JIGlzJR0zwtxknmG.OZRyvKw5FP5mRQ0S9mcQjgGdHpCqKXua',1,NULL,'System','Administrator','2016-06-03 00:26:14');