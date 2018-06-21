var operator = 'and' || 'or';

var empty = "{10_phone} empty";
var not_empty = "{11_web_addr} notempty";
var not_empty = "{12_name_title} = 'survey_string'";
var not_empty = "{13_phoner_email} <> 'survey_string'";
var not_empty = "{14_org_type} contains 'Private Corporation'";
var not_empty = "{15_principal_business_place} notcontains 'survey_string'";
var not_empty = "{16_registration_place} > 'survey_string'";
var not_empty = "{17_taxid__org_reg_number} < 'survey_string'";
var not_empty = "{18_formation_date} >= 'survey_string'";
var not_empty = "{10_phone} <= 'survey_string'";

var regx = /\{(\S+?)\}/g;

var allString = "{10_phone} empty and {11_web_addr} notempty and {12_name_title} = 'survey_string' and {13_phoner_email} <> 'survey_test' and {14_org_type} contains \"Private Corporation\" and {15_principal_business_place} notcontains 'survey_string' and {16_registration_place} > 'survey_string' and {17_taxid__org_reg_number} < 'survey_string' and {18_formation_date} >= 'survey_string' and {10_phone} <= 'survey_string'";

