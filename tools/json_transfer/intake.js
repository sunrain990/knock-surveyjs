var jsonString = {
  "locale": "default",
  "title": "Intake Form Questionnaire",
  "pages": [
    {
      "name": "page_sponsor_info",
      "elements": [
        {
          "type": "multipletext",
          "name": "business_sponsor_name",
          "title": "Name of Business Sponsor:",
          "isRequired": true,
          "items": [
            {
              "name": "sponsor_name",
              "title": "Name of Business Sponsor:"
            },
            {
              "name": "sponsor_title",
              "title": "Title:"
            },
            {
              "name": "department_function",
              "title": "Department / Function:"
            },
            {
              "name": "work_addr",
              "title": "Work Address:"
            },
            {
              "name": "sponsor_email",
              "title": "Email:"
            },
            {
              "name": "sponsor_phone",
              "title": "Phone:"
            },
            {
              "name": "date_completed",
              "title": "Date Completed:"
            }
          ]
        }
      ],
      "title": "Sponsor Information"
    },
    {
      "name": "Basic Information",
      "elements": [
        {
          "type": "panel",
          "name": "panel1",
          "elements": [
            {
              "type": "text",
              "name": "org_name_en",
              "title": "Organization (Legal) Name in English:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "org_name_other",
              "title": "Organization (Legal) Name in Local Language/Characters (if different):",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "trade_name",
              "title": "Trade Name or Doing Business As:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "web_addr",
              "title": "Web Address (if available):",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "primary_business_addr",
              "title": "Primary Business Address:"
            },
            {
              "type": "dropdown",
              "name": "country",
              "title": "Country:",
              "isRequired": true,
              "choices": [
                "Afghanistan",
                "Albania",
                "Algeria",
                "Angola",
                "Argentina",
                "Armenia",
                "Australia",
                "Austria",
                "Azerbaijan",
                "Bahamas",
                "Bahrain",
                "Bangladesh",
                "Barbados",
                "Belarus",
                "Belgium",
                "Benin",
                "Bhutan",
                "Bolivia",
                "Bosnia and Herzegovina",
                "Botswana",
                "Brazil",
                "Brunei Darussalam",
                "Bulgaria",
                "Burkina Faso",
                "Burundi",
                "Cabo Verde",
                "Cambodia",
                "Cameroon",
                "Canada",
                "Central African Republic",
                "Chad",
                "Chile",
                "China",
                "Colombia",
                "Comoros",
                "Congo",
                "Costa Rica",
                "Côte D'Ivoire",
                "Croatia",
                "Cuba",
                "Cyprus",
                "Czech Republic",
                "Democratic Republic of the Congo",
                "Denmark",
                "Djibouti",
                "Dominica",
                "Dominican Republic",
                "Ecuador",
                "Egypt",
                "El Salvador",
                "Equatorial Guinea",
                "Eritrea",
                "Estonia",
                "Ethiopia",
                "Finland",
                "France",
                "Gabon",
                "Gambia",
                "Georgia",
                "Germany",
                "Ghana",
                "Greece",
                "Grenada",
                "Guatemala",
                "Guinea",
                "Guinea Bissau",
                "Guyana",
                "Haiti",
                "Honduras",
                "Hong Kong",
                "Hungary",
                "Iceland",
                "India",
                "Indonesia",
                "Iran",
                "Iraq",
                "Ireland",
                "Israel",
                "Italy",
                "Jamaica",
                "Japan",
                "Jordan",
                "Kazakhstan",
                "Kenya",
                "Korea, North",
                "Korea, South",
                "Kosovo",
                "Kuwait",
                "Kyrgyzstan",
                "Laos",
                "Latvia",
                "Lebanon",
                "Lesotho",
                "Liberia",
                "Libya",
                "Lithuania",
                "Luxembourg",
                "Macedonia",
                "Madagascar",
                "Malawi",
                "Malaysia",
                "Maldives",
                "Mali",
                "Malta",
                "Mauritania",
                "Mauritius",
                "Mexico",
                "Moldova",
                "Mongolia",
                "Montenegro",
                "Morocco",
                "Mozambique",
                "Myanmar",
                "Namibia",
                "Nepal",
                "Netherlands",
                "New Zealand",
                "Nicaragua",
                "Niger",
                "Nigeria",
                "Norway",
                "Oman",
                "Pakistan",
                "Panama",
                "Papua New Guinea",
                "Paraguay",
                "Peru",
                "Philippines",
                "Poland",
                "Portugal",
                "Qatar",
                "Romania",
                "Russia",
                "Rwanda",
                "Saint Lucia",
                "Saint Vincent and the Grenadines",
                "Sao Tome and Principe",
                "Saudi Arabia",
                "Senegal",
                "Serbia",
                "Seychelles",
                "Sierra Leone",
                "Singapore",
                "Slovakia",
                "Slovenia",
                "Solomon Islands",
                "Somalia",
                "South Africa",
                "South Sudan",
                "Spain",
                "Sri Lanka",
                "Sudan",
                "Suriname",
                "Swaziland",
                "Sweden",
                "Switzerland",
                "Syria",
                "Taiwan",
                "Tajikistan",
                "Tanzania",
                "Thailand",
                "Timor-Leste",
                "Togo",
                "Trinidad and Tobago",
                "Tunisia",
                "Turkey",
                "Turkmenistan",
                "Uganda",
                "Ukraine",
                "United Arab Emirates",
                "United Kingdom",
                "United States of America",
                "Uruguay",
                "Uzbekistan",
                "Vanuatu",
                "Venezuela",
                "Vietnam",
                "Yemen",
                "Zambia",
                "Zimbabwe"
              ]
            },
            {
              "type": "text",
              "name": "state_province",
              "title": "State/Province:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "city",
              "title": "City:",
              "isRequired": true
            }
          ],
          "title": "Organization Background Information:"
        },
        {
          "type": "checkbox",
          "name": "service_types",
          "title": "Type of Service(s) to be provided by the Organization (select all that apply)",
          "isRequired": true,
          "choices": [
            "Sponsorship Recipient",
            "Lobbying",
            "Clinical Research",
            "Marketing",
            "Market Research",
            "Legal Services",
            "Transportation/Logistics",
            "Tax Advisors",
            "Licenses & Permits",
            "Regulatory Affairs",
            "Office Service/Support",
            "Healthcare Professional",
            "Membership",
            "Language Services",
            "Corporate Communications",
            "Taxi & Parking",
            "Travel Agents",
            "Meeting & Events",
            "Government Affairs",
            "Market Access",
            "Medical & Scientific Communication",
            "Quality(GxP)",
            "Patient Engagement",
            "Construction",
            "Customs Broker",
            "Grant Recipient",
            "Product Registration",
            "Recruiting",
            "Pharmacies",
            "Supplier/Manufacturing",
            "Distributor"
          ]
        },
        {
          "type": "radiogroup",
          "name": "government_or",
          "title": "To the best of your knowledge, will the Organization interact with the government, government-related entities , HCPs , patients , patient organizations , government officials , or relatives thereof, on behalf of Vertex? <see the word doc for for format>",
          "isRequired": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "type": "checkbox",
          "name": "goverment_y_n",
          "visibleIf": "{government_or} = \"Yes\"",
          "title": "If yes, please select all that apply:",
          "isRequired": true,
          "choices": [
            "Government",
            "HCPs",
            "Patients"
          ]
        }
      ],
      "title": "Basic Information"
    },
    {
      "name": "3p_scoped_if",
      "elements": [
        {
          "type": "multipletext",
          "name": "org_contact_point",
          "title": "Organization Point of Contact:",
          "isRequired": true,
          "items": [
            {
              "name": "first_last_name",
              "isRequired": true,
              "title": "First / Last Name: "
            },
            {
              "name": "title_role",
              "isRequired": true,
              "title": "Title / Role:"
            },
            {
              "name": "phone_number",
              "isRequired": true,
              "title": "Phone Number: "
            },
            {
              "name": "email_address",
              "isRequired": true,
              "title": "Email Address:"
            }
          ]
        },
        {
          "type": "dropdown",
          "name": "annual_expected_spend",
          "title": "\"Annual Expected Spend (select one) Please note, you must “consult” with ISS if the anticipated vendor spend is greater than or equal to $100K\":",
          "isRequired": true,
          "choices": [
            {
              "value": "0-10000",
              "text": "Under USD 10,000"
            },
            {
              "value": "10001-99999",
              "text": "USD 10,001 to 99,999"
            },
            {
              "value": "100000-149999",
              "text": "USD 100,000 to 149,999"
            },
            {
              "value": "150000-500000",
              "text": "USD 150,000 to 500,000"
            },
            {
              "value": "500000",
              "text": "Over USD 500,000"
            }
          ]
        },
        {
          "type": "text",
          "name": "annual_expected_less",
          "visibleIf": "{annual_expected_spend} = \"0-10000\"",
          "title": "If under USD 10,000, please specify the amount(USD):",
          "isRequired": true,
          "inputType": "number"
        },
        {
          "type": "html",
          "name": "annual_amount_100k",
          "visibleIf": "{annual_expected_spend} = \"100000-149999\" or {annual_expected_spend} = \"150000-500000\" or {annual_expected_spend} = \"500000\"",
          "html": "here test here should be a pop up"
        },
        {
          "type": "checkbox",
          "name": "countries_territories",
          "title": "Countries/Territories where goods and/or services will be provided\n(select all that apply)",
          "isRequired": true,
          "hasOther": true,
          "choices": [
            "Austria",
            "Australia",
            "Brazil"
          ]
        },
        {
          "type": "text",
          "name": "why_org_need",
          "title": "Why is the proposed Organization needed? (provide justification)",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "consider_additional_org_if",
          "title": "Were additional Organizations considered?",
          "isRequired": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "type": "text",
          "name": "explain_why_org_choosen",
          "visibleIf": "{consider_additional_org_if} = \"Yes\"",
          "title": "If yes, please explain why this Organization was chosen:",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "org_use_subs_if",
          "title": "To the best of your knowledge, will the Organization be using a subcontractor/sub-distributor on Vertex’s behalf?",
          "isRequired": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "type": "radiogroup",
          "name": "org_valuable_health_care_if",
          "title": "To the best of your knowledge, will the Organization make payments or provide anything of value to any government official, representative or entity that can influence a health care decision (e.g., product prescription, product approval, product reimbursement, clinical studies)?",
          "isRequired": true,
          "choices": [
            "Yes",
            "No"
          ]
        }
      ],
      "title": "If Third Party is In-scope:"
    },
    {
      "name": "distributors_only",
      "elements": [
        {
          "type": "radiogroup",
          "name": "other_org_selling_vtx_if",
          "title": "Are there any other Organizations currently selling Vertex product(s) in the proposed territory?",
          "isRequired": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "type": "text",
          "name": "question1",
          "visibleIf": "{other_org_selling_vtx_if} = \"Yes\"",
          "title": " If yes, provide further detail why a new distributor is required:",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "distribute_similar_to_vtx_if",
          "title": "Does the Organization distribute, or has it distributed goods for other clients/product lines similar to those of Vertex? ",
          "isRequired": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "type": "comment",
          "name": "why_distribute_similar_to_vtx_if",
          "visibleIf": "{distribute_similar_to_vtx_if} = \"Yes\"",
          "title": "Please explain:",
          "rows": 3
        },
        {
          "type": "dropdown",
          "name": "total_annual_expected_org_sales",
          "title": "Total Annual Expected Sales of Organization (including non-Vertex products) (select one)",
          "isRequired": true,
          "choices": [
            {
              "value": "0-100000",
              "text": "Under USD 100,000"
            },
            {
              "value": "100000-500000",
              "text": "USD 100,001 to 500,000"
            },
            {
              "value": "500000-1000000",
              "text": "USD 500,001 to 1,000,000"
            },
            {
              "value": "1000000",
              "text": "Over USD 1,000,000"
            }
          ]
        },
        {
          "type": "text",
          "name": "total_annual_expected_org_sales_under_100k",
          "visibleIf": "{total_annual_expected_org_sales} = \"0-100000\"",
          "title": "If under USD 100,000, specify amount(USD):",
          "isRequired": true,
          "inputType": "number"
        }
      ],
      "title": "To be completed for Distributors only\t\t\t\t\t\t\t"
    },
    {
      "name": "sops_policies_title",
      "elements": [
        {
          "type": "checkbox",
          "name": "sops_documents",
          "title": "Please select the applicable SOPs and policy documents to be sent to the client:",
          "isRequired": true,
          "choices": [
            "Document 1",
            "Document 2"
          ]
        }
      ],
      "title": "Applicable SOPs and Policies"
    }
  ],
  "showQuestionNumbers": "off"
}

console.log(JSON.parse(jsonString));

