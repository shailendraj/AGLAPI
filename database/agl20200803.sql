-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: agl
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aglupload`
--

DROP TABLE IF EXISTS `aglupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aglupload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `VENDOR` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `VENDOR_BP` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CHANNEL` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `BATCH_NUMBER` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `TRANSACTION_TYPE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `LEAD_ID` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `PROGRAM` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `TITLE` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `NAME_FIRST` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `NAME_MIDDLE` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `NAME_LAST` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `DOB` date NOT NULL,
  `BUILDING_NAME` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `FLOOR` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `LOT_NUMBER` int(10) NOT NULL,
  `UNIT_NUMBER` int(10) NOT NULL,
  `STREET_NUMBER` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `STREET_NAME` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `SUBURB` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `STATE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `POSTCODE` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE_HOME` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE_WORK` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE_MOBILE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `EMAIL` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `MARKETING` tinyint(1) NOT NULL,
  `ECONF_PACK_CONSENT` tinyint(1) NOT NULL,
  `ECOMM_CONSENT` tinyint(1) NOT NULL,
  `PRIMARY_SMS_CONSENT` tinyint(1) NOT NULL,
  `CREDIT_CONSENT` tinyint(1) NOT NULL,
  `AP_TITLE` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `AP_FIRST_NAME` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `AP_MIDDLE_NAME` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `AP_LAST_NAME` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `AP_PHONE_HOME` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `AP_PHONE_WORK` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `AP_PHONE_MOBILE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `AP_DOB` date NOT NULL,
  `AP_DRIVERS_LICENSE` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `BUSINESS_NAME` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `LEGAL_NAME` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `ABN` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ACN` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `BUSINESS_TYPE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `MAILING_BUILDING_NAME` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `MAILING_FLOOR` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `MAILING_LOT_NUMBER` int(10) NOT NULL,
  `MAILING_UNIT_NUMBER` int(10) NOT NULL,
  `MAILING_STREET_NUMBER` int(10) NOT NULL,
  `MAILING_STREET_NAME` int(55) NOT NULL,
  `MAILING_SUBURB` int(15) NOT NULL,
  `MAILING_STATE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `MAILING_POSTCODE` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `CONCESSION_TYPE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `CONCESSION_NUMBER` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `VALID_TO` date NOT NULL,
  `DRIVERS_LICENSE` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `PASSPORT` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `MEDICARE_NUMBER` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `LIFE_SUPPORT` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `DD_REQ` tinyint(1) NOT NULL,
  `NMI` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `DPI_MIRN` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `METER_NUMBER_E` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `METER_NUMBER_G` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `METER_TYPE` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `METER_HAZARD_E` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `DOG_CODE_G` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `SITE_ACCESS_E` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `SITE_ACCESS_G` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `RE_EN_REMOTE_SAFETY_CONFIRMATION` tinyint(1) NOT NULL,
  `DE_EN_REMOTE_SAFETY_CONFIRMATION` tinyint(1) NOT NULL,
  `SO_REQ` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `RETAILER` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `CAMPAIGN` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `SALES_DATE` date NOT NULL,
  `CONTRACT_NUMBER` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `OFFER_TYPE` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `PRODUCT_CODE_E` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `PRODUCT_CODE_G` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CAMPAIGN_CODE_RES_ELEC` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CAMPAIGN_CODE_RES_GAS` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CAMPAIGN_CODE_SME_ELEC` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CAMPAIGN_CODE_SME_GAS` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `MATRIX_CODE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `TARIFF_TYPE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `FLEX_PRICE` tinyint(1) NOT NULL,
  `REFERRER_NUMBER` int(25) NOT NULL,
  `FLYBUYS_CONSENT` tinyint(1) NOT NULL,
  `FLYBUYS_NUMBER` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `FLYBUYS_POINTS` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `AEO_REG` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `OWN_RENT` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `PROMOTION_CODE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `MERCH_REQ` tinyint(1) NOT NULL,
  `AGL_ASSIST` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `GAS_OFFER` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `ELEC_OFFER` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `MOVEIN_DATE_E` date NOT NULL,
  `MOVEIN_DATE_G` date NOT NULL,
  `MOVEIN_INSTRUCT_E` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `MOVEIN_INSTRUCT_G` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `MOVEOUT_DATE_E` date NOT NULL,
  `MOVEOUT_DATE_G` date NOT NULL,
  `MOVEOUT_INSTRUCT_E` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `MOVEOUT_INSTRUCT_G` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `GREENSALE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `AARH_DONATION` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `EPFS_REQ` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `SALES_AGENT` varchar(55) COLLATE utf8_unicode_ci NOT NULL,
  `EXISTING_GAS_BP_NUMBER` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `EXISTING_ELEC_BP_NUMBER` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `EXISTING_CRN_NUMBER` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `CANCELLATION_DATE` date NOT NULL,
  `CANCELLATION_TYPE` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CANCELLATION_REASON` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `CANCELLATION_REASON_OTHER` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `CHANGE_REQUEST` tinyint(1) NOT NULL,
  `CHANGE_REQUEST_DATE` date NOT NULL,
  `COMMENTS` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `DATE_ADDED` date NOT NULL,
  `MODIFIED_DATE` date NOT NULL,
  `AGL_API_RESPONSE_CODE` int(11) NOT NULL,
  `AGL_STATUS` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `ADDED_BY` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aglupload`
--

LOCK TABLES `aglupload` WRITE;
/*!40000 ALTER TABLE `aglupload` DISABLE KEYS */;
INSERT INTO `aglupload` VALUES (1,'AGL','etst','test','test','trna','SFD23454','program te','Mr','John Wick','Mii','Wick','0000-00-00','build','floo',123654,2587,NULL,'Test','Bundoora','NSW','2365','1212121','121212','','john@gmail.com',0,0,0,0,0,'test','test','test m name','test l name','','','','0000-00-00','88787878','Tmp','Temp','121212121','12121212','test','test','tet',0,0,0,0,0,'','','','','0000-00-00','','','','',0,'121212121','','','','','','','','',0,0,'','','','0000-00-00','','','','','','','','','','',0,0,0,'','','','','',0,'','','','0000-00-00','0000-00-00','','','0000-00-00','0000-00-00','','','','','','','','','','0000-00-00','','','',0,'0000-00-00','','2020-08-03','2020-08-03',0,'','');
/*!40000 ALTER TABLE `aglupload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keys`
--

DROP TABLE IF EXISTS `keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(45) NOT NULL,
  `level` int(2) NOT NULL,
  `ignore_limits` tinyint(1) NOT NULL DEFAULT '0',
  `is_private_key` tinyint(1) NOT NULL DEFAULT '0',
  `ip_addresses` text,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keys`
--

LOCK TABLES `keys` WRITE;
/*!40000 ALTER TABLE `keys` DISABLE KEYS */;
INSERT INTO `keys` VALUES (1,'aglrest',0,0,1,'127.0.0.1','2020-08-03 12:00:01'),(2,'aglauth',0,0,0,'','2020-08-03 12:00:01');
/*!40000 ALTER TABLE `keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uri` varchar(255) NOT NULL,
  `method` varchar(6) NOT NULL,
  `params` text,
  `api_key` varchar(40) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `time` int(11) NOT NULL,
  `rtime` float DEFAULT NULL,
  `authorized` varchar(1) NOT NULL,
  `response_code` smallint(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` VALUES (1,'api/callback','post','a:12:{s:6:\"Cookie\";s:43:\"ci_session=94ed9k8o1r181vgv952pasv390kcakjg\";s:14:\"Content-Length\";s:3:\"492\";s:10:\"Connection\";s:10:\"keep-alive\";s:15:\"Accept-Encoding\";s:17:\"gzip, deflate, br\";s:4:\"Host\";s:13:\"devaglapp.dev\";s:13:\"Postman-Token\";s:36:\"a0a3cc15-f0fe-4a89-9133-2efbc2ed2935\";s:6:\"Accept\";s:3:\"*/*\";s:10:\"User-Agent\";s:21:\"PostmanRuntime/7.26.2\";s:12:\"Content-Type\";s:10:\"text/plain\";s:14:\"Authentication\";s:42:\"basic YWdsYWRtaW46YWdsQDEyMzQ6YWdscmVzdA==\";i:0;s:492:\"{\n    \"correlationId\": \"1234567890-example\",\n    \"vendorLeadId\": \"leadid-example\",\n    \"transactionType\": \"Sale\",\n    \"code\": \"400\",\n    \"message\": \"Errors in order\",\n    \"errors\": [\n        {\n            \"field\": null,\n            \"code\": \"1091\",\n            \"message\": \"Customer already on selected product.\"\n        },\n        {\n            \"field\": null,\n            \"code\": \"1093\",\n            \"message\": \"Please submit product change request on or after move in date.\"\n        }\n    ]\n}\";i:1;s:492:\"{\n    \"correlationId\": \"1234567890-example\",\n    \"vendorLeadId\": \"leadid-example\",\n    \"transactionType\": \"Sale\",\n    \"code\": \"400\",\n    \"message\": \"Errors in order\",\n    \"errors\": [\n        {\n            \"field\": null,\n            \"code\": \"1091\",\n            \"message\": \"Customer already on selected product.\"\n        },\n        {\n            \"field\": null,\n            \"code\": \"1093\",\n            \"message\": \"Please submit product change request on or after move in date.\"\n        }\n    ]\n}\";}','aglrest','127.0.0.1',1596459829,0.197659,'1',200);
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `response`
--

DROP TABLE IF EXISTS `response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `response` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correlation_id` varchar(200) DEFAULT NULL,
  `vendor_lead_id` varchar(200) DEFAULT NULL,
  `transaction_type` varchar(200) DEFAULT NULL,
  `code` varchar(200) DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `errors` text,
  `create_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `response`
--

LOCK TABLES `response` WRITE;
/*!40000 ALTER TABLE `response` DISABLE KEYS */;
INSERT INTO `response` VALUES (1,'1234567890-example','leadid-example','Sale','400','Errors in order','[{\"field\":null,\"code\":\"1091\",\"message\":\"Customer already on selected product.\"},{\"field\":null,\"code\":\"1093\",\"message\":\"Please submit product change request on or after move in date.\"}]','2020-08-03 18:14:37'),(2,'1234567890-example','leadid-example','Sale','400','Errors in order','[{\"field\":null,\"code\":\"1091\",\"message\":\"Customer already on selected product.\"},{\"field\":null,\"code\":\"1093\",\"message\":\"Please submit product change request on or after move in date.\"}]','2020-08-03 18:33:49');
/*!40000 ALTER TABLE `response` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-03 18:35:29
