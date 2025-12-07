// Test: Verify background.js logic works correctly

const STORAGE_KEYS = ["globalEnabled", "domainControls", "stats", "history", "theme"];

// Simplified BASE_RULES for testing
const BASE_RULES = [
  {
    id: 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||doubleclick.net^",
      resourceTypes: ["script", "image"],
      excludedInitiatorDomains: ["youtube.com"]
    }
  },
  {
    id: 40,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: "||malwaredelivery.com^",
      resourceTypes: ["script"]
    }
  }
];

// Test the merging logic
function testRuleMerging() {
  const globalExcludedDomains = ["youtube.com", "youtu.be"];
  const userExcludedDomains = ["example.com"];
  const excludedDomains = [...new Set([...globalExcludedDomains, ...userExcludedDomains])];
  
  const rules = BASE_RULES.map((rule) => {
    const ruleExcludedDomains = rule.condition.excludedInitiatorDomains || [];
    const mergedExcludedDomains = [...new Set([...ruleExcludedDomains, ...excludedDomains])];
    
    return {
      ...rule,
      condition: {
        ...rule.condition,
        ...(mergedExcludedDomains.length ? { excludedInitiatorDomains: mergedExcludedDomains } : {})
      }
    };
  });
  
  console.log("Merged rules:");
  console.log(JSON.stringify(rules, null, 2));
  
  // Verify structure
  rules.forEach((rule, index) => {
    console.log(`Rule ${index}:`);
    console.log(`  - Has excludedInitiatorDomains: ${!!rule.condition.excludedInitiatorDomains}`);
    if (rule.condition.excludedInitiatorDomains) {
      console.log(`  - Domains: ${rule.condition.excludedInitiatorDomains.join(", ")}`);
    }
  });
}

testRuleMerging();
