# Telecom Sample Data Population Guide

Complete sample data for Liferay Objects with realistic telecom industry data for Indian market.

## Files Included

1. **populate-telecom-data.ps1** - PowerShell script (recommended for Windows)
2. **populate-telecom-data.sh** - Bash script (for Linux/Mac)
3. **SAMPLE_DATA.json** - JSON reference file with all data

## Quick Start

### Option 1: PowerShell (Windows) ✅ RECOMMENDED

```powershell
# Open PowerShell and navigate to the project directory
cd d:\projects\Hackathon\hackathon-workspace\demo

# Run the script
.\populate-telecom-data.ps1
```

**Note:** If you get execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\populate-telecom-data.ps1
```

### Option 2: Bash (Linux/Mac)

```bash
cd demo/
chmod +x populate-telecom-data.sh
./populate-telecom-data.sh
```

### Option 3: Manual Curl Commands

```bash
# Create a service
curl -X POST "http://localhost:8080/o/c/services/" \
  -H "Authorization: Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0" \
  -H "Content-Type: application/json" \
  -d '{
    "r_serviceId_serviceId": "SRV001",
    "serviceName": "Basic Voice Plan",
    "price": 299
  }'
```

## Sample Data Details

### 5 Services (Telecom Plans)
| ID | Name | Price | Type | Data Limit |
|---|---|---|---|---|
| SRV001 | Basic Voice Plan | ₹299 | Voice Only | 0 GB |
| SRV002 | Standard Data Plan | ₹499 | Voice + Data | 2 GB |
| SRV003 | Premium Unlimited | ₹799 | All Inclusive | Unlimited |
| SRV004 | Business Plan | ₹1299 | Business | 5 GB |
| SRV005 | Senior Citizen Plan | ₹199 | Special | 0.5 GB |

### 5 Customers (Indian Cities)
| ID | Name | City | Phone | Credit Limit |
|---|---|---|---|---|
| CUST001 | Rajesh Kumar | Bangalore | 9876543210 | ₹10,000 |
| CUST002 | Priya Sharma | Mumbai | 9123456789 | ₹15,000 |
| CUST003 | Amit Patel | Ahmedabad | 9654321098 | ₹20,000 |
| CUST004 | Neha Singh | Delhi | 9234567890 | ₹12,000 |
| CUST005 | Vikram Reddy | Hyderabad | 9456123789 | ₹18,000 |

### 6 Orders (With Relationships)
| Order ID | Customer | Service | Amount | Status |
|---|---|---|---|---|
| ORD001 | CUST001 | SRV001 | ₹299 | Active |
| ORD002 | CUST002 | SRV002 | ₹499 | Active |
| ORD003 | CUST003 | SRV004 | ₹1,299 | Active |
| ORD004 | CUST004 | SRV003 | ₹799 | Active |
| ORD005 | CUST005 | SRV002 | ₹499 | Active |
| ORD006 | CUST001 | SRV005 | ₹199 | Active |

### 6 Invoices (With Taxes)
| Invoice ID | Order | Amount | Tax (15%) | Total | Status |
|---|---|---|---|---|---|
| INV001 | ORD001 | ₹299 | ₹44.85 | ₹343.85 | Paid |
| INV002 | ORD002 | ₹499 | ₹74.85 | ₹573.85 | Paid |
| INV003 | ORD003 | ₹1,299 | ₹194.85 | ₹1,493.85 | Paid |
| INV004 | ORD004 | ₹799 | ₹119.85 | ₹918.85 | Pending |
| INV005 | ORD005 | ₹499 | ₹74.85 | ₹573.85 | Pending |
| INV006 | ORD006 | ₹199 | ₹29.85 | ₹228.85 | Paid |

## Relationships Ensured ✅

✅ **One Customer → Many Services/Orders/Invoices**
- CUST001 has 2 orders (ORD001, ORD006)
- Other customers have single/multiple orders

✅ **One Service → Many Orders**
- SRV002 is used in 2 orders (ORD002, ORD005)

✅ **One Order → One Invoice**
- Each order has exactly one invoice

✅ **Proper ID Linking**
- Invoices link to Orders
- Orders link to Customers and Services
- All relationships are consistent

## Data Features

🎯 **Telecom Industry Realistic Data**
- ✓ Indian phone numbers (10-digit format)
- ✓ Real Indian cities and states
- ✓ Realistic telecom pricing (₹199-₹1299)
- ✓ GST/Tax calculation (15%)
- ✓ Meaningful plan names and descriptions
- ✓ Telecom-specific fields (data limit, voice limit, SMS limit)

🧾 **Financial Data**
- Revenue breakdown by customer
- Tax calculations
- Payment methods (Credit Card, Debit Card, Bank Transfer, UPI, Net Banking)
- Invoice statuses (Paid/Pending)

📊 **Business Logic**
- One customer can have multiple orders
- Order amounts match service prices
- Invoices include computed tax (15%)
- Proper date progressions
- Consistent status tracking

## Verification

After running the script, verify data in Liferay:

1. **Liferay Admin Portal** → Objects → Customer/Service/Order/Invoice
2. **REST API Check:**
   ```bash
   curl -H "Authorization: Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0" \
     http://localhost:8080/o/c/customers/
   ```

## Troubleshooting

### Issue: "Authorization" error
- Check if Liferay is running on http://localhost:8080
- Verify credentials: test@liferay.com / test

### Issue: Field not found
- Review the object definition in Liferay
- Cross-check field names in the script
- Consider custom fields vs standard fields

### Issue: Relationship errors
- Ensure all referenced objects exist first
- Create services → customers → orders → invoices (in this order)
- Double-check ID references match exactly

## Quick Data Reset

To clear all test data and start fresh:

```powershell
# Delete all invoices, orders, customers, services
# Use Liferay Admin UI: Objects → Select Object → Delete All Records
```

## Additional Resources

- [Liferay Objects Documentation](https://learn.liferay.com/w/liferay-cloud/build-applications/objects)
- [Liferay REST API](https://learn.liferay.com/w/liferay-cloud/apis/headless-api/consuming-headless-apis)
- Sample Data Reference: SAMPLE_DATA.json

## Support

For issues or modifications:
1. Check field names in your object definition
2. Review Liferay logs: `http://localhost:8080/o/admin`
3. Adjust script field names to match your object configuration
