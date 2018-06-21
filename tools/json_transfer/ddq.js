var obj = `{
  locale: "default",
    title: "Distributor Due Diligence Questionnaire",
  pages: [
  {
    name: "page_org_info",
    elements: [
      {
        type: "text",
        name: "1_full_name",
        title: "1. Full legal name of Organization in English: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "2_full_name_local",
        title: "2. Full legal name of Organization in local language/characters (if different): ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "3_assumed_name",
        title: "3. List any assumed names or aliases used by the Organization stated above: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "4_used_org_names",
        title: "4. List any other personal, legal, or trade names used, or previously used, by the Organization: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "5_current_street_addr",
        title: "5. Current street address (Please do not use PO Boxes): ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "6_city",
        title: "6. City: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "7_state_province",
        title: "7. State / Province: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "8_postal_code",
        title: "8. Postal Code: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "dropdown",
        name: "9_country",
        title: "9. Country: ",
        isRequired: true,
        choices: [
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
        type: "text",
        name: "10_phone",
        title: "10. Phone number: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "11_web_addr",
        title: "11. Web address (if applicable): ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "12_name_title",
        title: "12. Contact person name and title: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "13_phoner_email",
        title: "13. Contact person phone number and e-mail address: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "checkbox",
        name: "14_org_type",
        title: "14. Organization type:(Please select one)",
        isRequired: true,
        hasOther: true,
        choices: [
          "Private Corporation",
          "LLC",
          "Partnership",
          "Publicly Traded Corporation",
          "Joint Venture",
          "Sole Proprietorship"
        ]
      },
      {
        type: "text",
        name: "15_principal_business_place",
        title: "15. Principal place of business: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "16_registration_place",
        title: "16. Place of formation, incorporation, or equivalent registration: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "17_taxid__org_reg_number",
        title: "17. Tax ID or Organization registration number: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "18_formation_date",
        title: "18. Date of formation (dd/mm/yyyy): ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "checkbox",
        name: "19_employee_numbers",
        title: "19. Number of employees:(Please select one)",
        isRequired: true,
        choices: [
          {
            value: "1-50",
            text: "1 - 50"
          },
          {
            value: "51-100",
            text: "51 - 100"
          },
          {
            value: "101",
            text: "101+"
          }
        ]
      },
      {
        type: "text",
        name: "20_gorss_sales_past3y",
        title: "20. Gross annual revenues/sales for the past three years: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "21_parent_org_name",
        title: "21. If applicable, provide name of parent Organization(s): ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "text",
        name: "22_org_structure_overview",
        title: "22. Please provide an overview of the Organization’s legal structure (including subsidiaries) through either a hard copy or a link to an online source. If the link to an online source does not include or provide addresses of all Organization offices, and/or branches, please list: ",
        isRequired: true,
        placeHolder: "Click here to enter text."
      },
      {
        type: "panel",
        name: "lagest_geographical_region",
        elements: [
          {
            type: "radiogroup",
            name: "23_market_geographical_region",
            title: "Please Choose one.",
            isRequired: true,
            hasOther: true,
            choices: [
              "Asia",
              "Middle East",
              "USA/Canada",
              "Sub Saharan Africa",
              "Europe",
              "Northern Africa",
              "Latin America"
            ]
          },
          {
            type: "text",
            name: "23_annual_revenue_percentage",
            title: "Percentage of annual revenue for the largest geographical market:",
            isRequired: true
          }
        ],
        title: "23.What region represents the Organization’s largest geographical market?\n(Please check one and give a percentage of annual revenue)"
      }
    ],
    title: "I. ORGANIZATION INFORMATION"
  },
  {
    name: "page_beneficial_owners",
    elements: [
      {
        type: "matrixdynamic",
        name: "24_all_beneficial_owners",
        title: "24.List all beneficial owners in the Organization. Beneficial owners are individuals or entities with 10% or more ownership interest in the Organization. Where applicable,\nplease include entities and individuals holding ownership directly or indirectly on behalf\nof others.",
        isRequired: true,
        columns: [
          {
            name: "name",
            title: "Name",
            cellType: "text"
          },
          {
            name: "country_of_residence",
            title: "Country of Residence",
            cellType: "text"
          },
          {
            name: "address",
            title: "Address",
            cellType: "text"
          },
          {
            name: "date_of_birth",
            title: "Date of Birth",
            cellType: "text"
          },
          {
            name: "ownership",
            title: "% Ownership(over 10%)",
            cellType: "text"
          },
          {
            name: "government_related",
            title: "Government Related(Y/N)",
            cellType: "text"
          }
        ],
        choices: [
          1,
          2,
          3,
          4,
          5
        ]
      }
    ],
    title: " II. BENEFICIAL OWNERS"
  },
  {
    name: "page_manager_director_officer",
    elements: [
      {
        type: "matrixdynamic",
        name: "25_government_entity_for_vertex_table",
        title: "25. Please list all individuals at the Organization who will be performing services forVertex and list all key personnel (e.g., managers, directors, &amp; officers) from yourOrganization. Do not include any beneficial owners that you have already listed.",
        isRequired: true,
        columns: [
          {
            name: "Name",
            title: "Name",
            cellType: "text"
          },
          {
            name: "Title",
            title: "Title",
            cellType: "text"
          },
          {
            name: "Citizenship",
            title: "Citizenship",
            cellType: "text"
          },
          {
            name: "Country of Residence",
            title: "Country of Residence",
            cellType: "text"
          }
        ],
        choices: [
          1,
          2,
          3,
          4,
          5
        ],
        rowCount: 5
      }
    ],
    title: "III. MANAGERS, DIRECTORS, & OFFICERS"
  },
  {
    name: "page_performing_vtx_services",
    elements: [
      {
        type: "text",
        name: "26_org_describe_vtx",
        title: "26.Describe the Organization’s primary line of business and the service the\nOrganization will be providing for Vertex.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "27_similar_services_for_vtx_if",
        title: "27.Has the Organization performed the same or similar services proposed to be\nperformed for Vertex for any organizations that sell, market, or distribute similar\nproducts to those of Vertex?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "text",
        name: "27_similar_services_for_vtx_if_yes",
        visibleIf: "{27_similar_services_for_vtx_if} = \"Yes\"",
        title: "If YES, please list the services performed:",
        isRequired: true
      },
      {
        type: "text",
        name: "28_what_country_org_provide_service",
        title: "28.In what country(ies) will the Organization provide services for Vertex?",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "29_retain_3p_if",
        title: "29.Has or will the Organization retain a third party (entity or individual) (e.g., agent,\nconsultant, independent contractor, subcontractor) to conduct business\nactivities on Vertex’s behalf?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "text",
        name: "29_retain_3p_if_yes",
        visibleIf: "{29_retain_3p_if} = \"Yes\"",
        title: "If YES, please list the full legal name of each such person or entity, address, and\naffiliation with the Organization, and responsibilities regarding Vertex-related\nbusiness.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "30_contract_with_anti_laws",
        title: "30.If the response to question 29 is YES, does the contract with such agent, consultant, independent contractor, or subcontractor, contain agreements or\nwarranties covering compliance with applicable anti-corruption and anti-bribery\nlaws?",
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "radiogroup",
        name: "31_org_require_3p_certificatoin_if",
        title: "31.Does the Organization’s services require a valid business license or government\nor other third party certification?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "text",
        name: "31_org_require_3p_certificatoin_if_yes",
        visibleIf: "{31_org_require_3p_certificatoin_if} = \"Yes\"",
        title: "If YES, provide names of license/certifications and period of validity.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "32_org_denied_if",
        title: "32.Has your Organization ever been denied any official license/approval request or\nhad any license/approval revoked, suspended, or not renewed?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "text",
        name: "32_org_denied_if_yes",
        visibleIf: "{32_org_denied_if} = \"Yes\"",
        title: "If YES, provide an explanation:",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "33_org_previously_vtx_if",
        title: "33.Has the Organization previously done business with Vertex?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "text",
        name: "33_org_previously_vtx_if_yes",
        visibleIf: "{33_org_previously_vtx_if} = \"Yes\"",
        title: "If YES, what percentage of the Organization’s business (as a percentage of\nrevenue) is with or on behalf of Vertex?\nIf your Organization does not currently do business with Vertex, please provide\nan estimate of the percentage of Vertex-related revenues based on proposed\nfees and pricing.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "34_payments_made_in_ur_org_if",
        title: "34.Will all payments to you be made in your Organization’s place of business and\ncountry of registration?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "file",
        name: "34_payments_made_in_ur_org_if_yes",
        visibleIf: "{34_payments_made_in_ur_org_if} = \"Yes\"",
        title: "Please attach a document from your bank that certifies your banking\nrelationship for the fulfillment of payments to you, as confirmed above.",
        maxSize: 10000
      }
    ],
    title: "IV. PERFORMING VERTEX-RELATED SERVICES"
  },
  {
    name: "page_government_relationships_and_interactions",
    elements: [
      {
        type: "radiogroup",
        name: "35_current_past_gov_official_if",
        title: "35.Is any person (or their family/household members) identified in the “Beneficial Owners” or “Managers, Directors, & Officers” sections above, a current or past\ngovernment official?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "comment",
        name: "35_current_past_gov_official_if_yes",
        visibleIf: "{35_current_past_gov_official_if} = \"Yes\"",
        title: "If YES, please list the name of the individual, title or role at the Organization,name of the government entity, and role in the government entity.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "36_gov_own_interest_if",
        title: "36.Does any government official, government-related entity, or organizationperforming a government function, own any ownership interest in or exerciseany corporate or financial control over any person and/or the Organization?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "comment",
        name: "36_gov_own_interest_if_yes",
        visibleIf: "{36_gov_own_interest_if} = \"Yes\"",
        title: "If YES, please list the name and address of the government-related entity or\ngovernment official and describe the ownership interest in and/or control over\nyou or the Organization.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "37_org_interact_gov_related_if",
        title: "37.Will the organization (or anyone from the organization) interact with any government-related entities, patients , patient organizations , government officials, or relatives thereof, in connection with our current/proposed agreement?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "comment",
        name: "37_org_interact_gov_related_if_yes",
        visibleIf: "{37_org_interact_gov_related_if} = \"Yes\"",
        title: "If YES, please list the government-related entities or individuals you may interact with including positions/titles; describe the purpose of the interaction with the government-related entity or individual and the frequency of such interaction.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "38_org_involved_in_gov_related_if",
        title: "38.Is any person (or their family/household members) from the organization identified in the “Beneficial Owners” or “Managers, Directors, & Officers” sections above involved in any business relationship  with any current Government Official (or close family/household member) or any government-related entity?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "comment",
        name: "38_org_involved_in_gov_related_if_yes",
        visibleIf: "{38_org_involved_in_gov_related_if} = \"Yes\"",
        title: "If YES, please list the government related entities or individuals you are in a business relations with including positions/titles; describe the purpose of such business relationships with the government entity or individual and describe the frequency of such business-related interactions.",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "39_org_influence_gov_if",
        title: "39.Does the Organization or any related person (including family/household members) maintain a position (directly or indirectly) that can exercise or influence a decision  levied by any government or government-owned or controlled entity (such as a government-owned Organization), including by virtue of holding a leadership position in a political party? ",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "comment",
        name: "39_org_influence_gov_if_yes",
        visibleIf: "{39_org_influence_gov_if} = \"Yes\"",
        title: "If YES, please list the government related entities or individuals you are in a business relationship with, including positions and titles.",
        isRequired: true
      },
      {
        type: "text",
        name: "39_org_influence_gov_if_yes_purpose",
        visibleIf: "{39_org_influence_gov_if} = \"Yes\"",
        title: "If YES, what is the purpose of such interactions with the government entity or individual?",
        isRequired: true
      },
      {
        type: "radiogroup",
        name: "40_org_provide_value_to_gov_if",
        title: "40.Will the Organization provide, or intend to provide, any payment or transfer of anything of value  to a government entity or Government Official in the course of the Organization’s expected operations (or that of its subsidiaries, sister organizations, joint venture partners, or sub-contractors) on behalf of Vertex?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "matrixdynamic",
        name: "40_org_provide_value_to_gov_if_yes",
        visibleIf: "{40_org_provide_value_to_gov_if} = \"Yes\"",
        title: "If YES, please describe the nature, frequency, and types of such payments. ",
        isRequired: true,
        columns: [
          {
            name: "nature",
            title: "Nature",
            cellType: "text"
          },
          {
            name: "frequency",
            title: "Frequency",
            cellType: "text"
          },
          {
            name: "types",
            title: "Types",
            cellType: "text"
          }
        ],
        choices: [
          1,
          2,
          3,
          4,
          5
        ],
        rowCount: 1
      },
      {
        type: "radiogroup",
        name: "41_org_sell_vtx_products_if",
        title: "41.Does or will the Organization (or its subsidiaries, sister organizations, joint venture partners or subcontractors) sell Vertex products and/or provide services on behalf of Vertex to wholly- or partially-owned government-owned entities (e.g., military, government-owned hospitals, government-owned universities, retail stores) or quasi-governmental entities (e.g., duty free organizations)?",
        isRequired: true,
        choices: [
          "Yes",
          "No"
        ]
      },
      {
        type: "matrixdynamic",
        name: "41_org_sell_vtx_products_if_yes",
        visibleIf: "{41_org_sell_vtx_products_if} = \"Yes\"",
        title: "If YES, please describe the nature, frequency, and type of such sales or provision of services.",
        isRequired: true,
        columns: [
          {
            name: "nature",
            title: "Nature",
            cellType: "text"
          },
          {
            name: "frequency",
            title: "Frequency",
            cellType: "text"
          },
          {
            name: "types",
            title: "Types",
            cellType: "text"
          }
        ],
        choices: [
          1,
          2,
          3,
          4,
          5
        ],
        rowCount: 1
      }
    ],
    title: "V. GOVERNMENT RELATIONSHIPS AND INTERACTIONS"
  },
  {
    name: "page_compliance_policies_and_programs",
    elements: [
      {
        type: "matrix",
        name: "42_org_mantain_policies",
        title: "42.Does the Organization maintain any policies or procedures regarding the following: ",
        isRequired: true,
        columns: [
          "Yes",
          "No"
        ],
        rows: [
          {
            value: "r1",
            text: "1.Code of Conduct:"
          },
          {
            value: "r2",
            text: "2.Anti-Bribery/Anti-Corruption:"
          },
          {
            value: "r3",
            text: "3.Facilitation Payments:"
          },
          {
            value: "r4",
            text: "4.Gifts and Gratuity (providing/receiving): "
          },
          {
            value: "r5",
            text: "5.Political and charitable contributions: "
          },
          {
            value: "r6",
            text: "6.Travel, Meals, and Entertainment; Expense Reimbursement: "
          },
          {
            value: "r7",
            text: "7.Third Party Due Diligence Program: "
          },
          {
            value: "r8",
            text: "8.Interactions with Health Care Professionals(HCPs):"
          },
          {
            value: "r9",
            text: "9.Procurement (e.g., bidding, tendering): "
          },
          {
            value: "r10",
            text: "10.Hotline or other mechanism to anonymously report violations of law or non-compliance with Organization polices:"
          },
          {
            value: "r11",
            text: "11.Interactions with Patient Organizations: "
          },
          {
            value: "r12",
            text: "12.Anti-Corruption and Anti-Bribery Training:"
          }
        ]
      },
      {
        type: "radiogroup",
        name: "42_r12_if",
        visibleIf: "{42_org_mantain_policies.r12} = \"Yes\"",
        title: "If YES, please select frequency of training:",
        isRequired: true,
        choices: [
          "Annually",
          "Quarterly",
          "Monthly",
          "Once Upon Hire"
        ]
      }
    ],
    title: "VI.COMPLIANCE POLICIES AND PROGRAMS"
  },
  {
    name: "page_legal_information",
    elements: [
      {
        type: "matrix",
        name: "43_org_value_follow_if",
        title: "43.Has the Organization (or any person owning at least 10% of the Organization, director, executive, officer, or employee) been accused of allegedly violating any law by accepting, offering, paying, promising to pay, or authorizing the payment of money or anything of value to the following: ",
        isRequired: true,
        columns: [
          "Yes",
          "No"
        ],
        rows: [
          {
            value: "r1",
            text: "1.Any Government Official: "
          },
          {
            value: "r2",
            text: "2.Any individual or entity other than a Government Official:"
          }
        ]
      },
      {
        type: "comment",
        name: "43_r2_if_yes",
        visibleIf: "{43_org_value_follow_if.r2} = \"Yes\"",
        title: "If YES, please provide additional details as to the event(s) and their outcome(s).",
        isRequired: true
      },
      {
        type: "matrix",
        name: "44_org_change_investigation_if",
        title: "44.Has the Organization (or any owner with at least a 10% ownership, director, executive or officer) been convicted, charged or the subject of any investigation with respect to the following acts or similar offense?",
        isRequired: true,
        columns: [
          "Yes",
          "No"
        ],
        rows: [
          {
            value: "r1",
            text: "1.Criminal conspiracy/participation in criminal organization:"
          },
          {
            value: "r2",
            text: "2.Corruption or bribery:"
          },
          {
            value: "r3",
            text: "3.Fraud, fraudulent trading or theft:"
          },
          {
            value: "r4",
            text: "4.Tax evasion or other tax-related offences:"
          },
          {
            value: "r5",
            text: "5.Anti-trust:"
          },
          {
            value: "r6",
            text: "6.Terrorist financing:"
          },
          {
            value: "r7",
            text: "7.Money laundering:"
          },
          {
            value: "r8",
            text: "8.Financial statement fraud:"
          },
          {
            value: "r9",
            text: "9.Securities fraud:"
          },
          {
            value: "r10",
            text: "10.Other criminal activity:"
          }
        ]
      },
      {
        type: "comment",
        name: "44_r10_if_yes",
        visibleIf: "{44_org_change_investigation_if.r10} = \"Yes\"",
        title: "If YES, please provide additional details as to the event(s) and their outcome(s).",
        isRequired: true
      },
      {
        type: "matrix",
        name: "45_org_conduct_investigation_if",
        title: "45.Has the Organization conducted any investigations related to the offering, paying, promising to pay, authorizing the payment, or accepting money or anything of value to the following:",
        isRequired: true,
        columns: [
          "Yes",
          "No"
        ],
        rows: [
          {
            value: "r1",
            text: "1.Any Government Official: "
          },
          {
            value: "r2",
            text: "2.Any individual or entity other than a Government Official:"
          }
        ]
      },
      {
        type: "comment",
        name: "45_if_yes",
        visibleIf: "{45_org_conduct_investigation_if.r1} = \"Yes\" or {45_org_conduct_investigation_if.r2} = \"Yes\"",
        title: "If YES to any of the above, please provide additional details as to the event(s) and their outcome(s).",
        isRequired: true
      }
    ],
    title: "VII.LEGAL INFORMATION"
  },
  {
    name: "page_references",
    elements: [
      {
        type: "matrixdynamic",
        name: "46_unaffiliated_business_contacts",
        title: "Please provide THREE unaffiliated business contacts, who, if deemed necessary by Vertex, may be contacted for reference purposes:",
        isRequired: true,
        columns: [
          {
            name: "full_legal_name",
            title: "Individual Contact Full Legal Name:",
            cellType: "text"
          },
          {
            name: "business_relationship",
            title: "Business Relationship:",
            cellType: "text"
          },
          {
            name: "address",
            title: "Address:",
            cellType: "text"
          },
          {
            name: "phone_number",
            title: "Phone Number:",
            cellType: "text"
          }
        ],
        rowCount: 3
      }
    ],
    title: "VIII.REFERENCES"
  },
  {
    name: "page_certification",
    elements: [
      {
        type: "html",
        name: "html_certification",
        html: "I understand that Vertex will rely on the information provided in this questionnaire in determining whether to enter into or continue a business relationship with the signing Organization (“Organization”), and that any false, incomplete, or misleading information will be grounds for the immediate termination of any contractual agreement or other arrangement. Organization hereby certifies that the foregoing information, including that contained in any attachments hereto, is accurate and complete. Organization further agrees to update Vertex if any of the information provided hereto changes and understands that any such changes may result in additional due diligence. </br>\nOrganization agrees and understands that this information is provided to Vertex to assist in evaluation of the undersigned’s proposed business relationship, and that if a contract or other similar agreement is executed, Vertex or its relevant affiliate or subsidiary may terminate such agreement for breach of any element of this certification. </br>\nOrganization further certifies that (i) it complies and will comply with the application anti-corruption laws of its home country and each of the countries in which it operates as well as the Foreign Corrupt Practices Act of 1977, as amended (“FCPA”) and (ii) it has reviewed and will comply with Vertex’s Code of Conduct and applicable SOPs and policies. </br>\nOrganization represents that all necessary notice has been provided, and/or consent obtained, as required by applicable law, for the collection, use, transfer, and disclosure of the personal data of any identified or identifiable data subject (such as an employee, contractor, or third party) pursuant to this questionnaire including but not limited to the fact that such personal data may be disclosed, as reasonably necessary for the completion of this assessment, to affiliates or service providers of Vertex and that for this purpose it may be necessary to transfer such personal data to other countries that may afford a different level of protection than the country of origin. </br>\nOrganization acknowledges and agrees that this questionnaire creates no obligation whatsoever on the part of Vertex or its subsidiaries and affiliates to enter into any contractual agreement or other agreement with the Organization. </br>\n"
      },
      {
        type: "multipletext",
        name: "47_certification_agree",
        title: "I agree with the certification.",
        isRequired: true,
        items: [
          {
            name: "organization_name",
            isRequired: true,
            title: "Organization Name:"
          },
          {
            name: "by",
            isRequired: true,
            title: "By:"
          },
          {
            name: "title",
            isRequired: true,
            title: "Title:"
          },
          {
            name: "signature",
            isRequired: true,
            title: "Signature:"
          }
        ]
      }
    ],
    title: "IX.CERTIFICATION"
  }
],
  showQuestionNumbers: "off"
}`;
