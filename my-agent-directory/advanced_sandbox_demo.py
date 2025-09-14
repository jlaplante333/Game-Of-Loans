#!/usr/bin/env python3
"""
Advanced Daytona Sandbox Demo for Game of Loans Agents
Demonstrates advanced capabilities you can run right now
"""

from daytona import Daytona, DaytonaConfig
import json
import time
from datetime import datetime

def run_advanced_demo():
    """Run advanced demonstrations in your existing sandbox"""
    
    print("🚀 Advanced Game of Loans Agent Demo in Daytona")
    print("=" * 60)
    
    # Connect to your existing sandbox
    config = DaytonaConfig(api_key="dtn_b2a1dec9c509791310fbd76d6700cd9c6c858d2aa1785347eb57f223431a0dcb")
    daytona = Daytona(config)
    
    # Use your existing sandbox
    sandbox = daytona.create()  # This will connect to existing or create new
    
    print("✅ Connected to Daytona sandbox")
    print(f"🌐 Dashboard: https://app.daytona.io/dashboard/sandboxes")
    
    # Demo 1: Multi-Customer Testing
    print("\n🎭 DEMO 1: Multi-Customer Agent Testing")
    print("-" * 40)
    
    multi_customer_code = '''
import json
from datetime import datetime

# Define different customer profiles
customers = [
    {"name": "Alex Thompson", "fico": 735, "loyalty": 6, "income": 95000, "loan": 450000},
    {"name": "Sarah Chen", "fico": 680, "loyalty": 3, "income": 75000, "loan": 320000},
    {"name": "Mike Rodriguez", "fico": 800, "loyalty": 8, "income": 120000, "loan": 600000},
    {"name": "Lisa Park", "fico": 620, "loyalty": 2, "income": 55000, "loan": 280000}
]

print("🎯 Multi-Customer Agent Testing Results:")
print("=" * 50)

total_value = 0
for customer in customers:
    # Simulate agent processing for each customer
    
    # Background Check
    bg_status = "CLEAR" if customer["fico"] > 600 else "REVIEW"
    
    # Credit Evaluation
    if customer["fico"] >= 750:
        credit_rating = "Excellent"
        base_apr = 6.8
    elif customer["fico"] >= 700:
        credit_rating = "Good" 
        base_apr = 7.2
    elif customer["fico"] >= 650:
        credit_rating = "Fair"
        base_apr = 7.8
    else:
        credit_rating = "Poor"
        base_apr = 8.5
    
    # Loyalty-based negotiation
    if customer["loyalty"] > 5:
        rate_reduction = 0.5  # Up to 10% reduction for high loyalty
        max_cashback = customer["loan"] * 0.05  # Up to 5%
    else:
        rate_reduction = 0.2  # Up to 5% reduction for low loyalty  
        max_cashback = customer["loan"] * 0.02  # Up to 2%
    
    final_apr = base_apr - rate_reduction
    cashback = max_cashback * 0.8  # 80% of max
    monthly_payment = (customer["loan"] * (final_apr/100/12)) / (1 - (1 + final_apr/100/12)**(-360))
    
    # Calculate customer value
    original_payment = (customer["loan"] * (base_apr/100/12)) / (1 - (1 + base_apr/100/12)**(-360))
    monthly_savings = original_payment - monthly_payment
    customer_value = (monthly_savings * 360) + cashback
    
    total_value += customer_value
    
    print(f"\\n👤 {customer['name']}:")
    print(f"   📊 FICO: {customer['fico']} ({credit_rating})")
    print(f"   🏆 Loyalty Score: {customer['loyalty']}")
    print(f"   💰 Final APR: {final_apr:.2f}% (down from {base_apr:.2f}%)")
    print(f"   💵 Monthly Payment: ${monthly_payment:,.2f}")
    print(f"   🎁 Cashback: ${cashback:,.0f}")
    print(f"   ✨ Customer Value: ${customer_value:,.0f}")

print(f"\\n🎉 TOTAL CUSTOMER VALUE ACROSS ALL PROFILES: ${total_value:,.0f}")
print("✅ Multi-customer testing complete!")
'''
    
    response = sandbox.process.code_run(multi_customer_code)
    if response.exit_code == 0:
        print("✅ Multi-customer test successful!")
        print(response.result)
    else:
        print(f"❌ Error: {response.result}")
    
    # Demo 2: Real-Time Analytics Dashboard
    print("\n📊 DEMO 2: Real-Time Analytics Dashboard")
    print("-" * 40)
    
    analytics_code = '''
import json
import random
from datetime import datetime, timedelta

# Simulate real-time agent analytics
print("📊 Game of Loans Agent Analytics Dashboard")
print("=" * 50)

# Generate sample data for the last 24 hours
current_time = datetime.now()
analytics_data = {
    "timestamp": current_time.isoformat(),
    "active_negotiations": random.randint(15, 45),
    "completed_today": random.randint(80, 120),
    "approval_rate": round(random.uniform(0.75, 0.95), 3),
    "average_customer_value": random.randint(45000, 85000),
    "total_cashback_issued": random.randint(500000, 1200000),
    "agent_performance": {
        "background_check": {"success_rate": 0.98, "avg_time": "2.3s"},
        "credit_evaluation": {"success_rate": 0.96, "avg_time": "1.8s"},
        "offer_generation": {"success_rate": 0.99, "avg_time": "0.9s"},
        "negotiation": {"success_rate": 0.87, "avg_time": "4.2min"},
        "arbitration": {"usage_rate": 0.13, "avg_time": "2.1min"},
        "advisory": {"satisfaction": 0.94, "avg_time": "1.5s"}
    }
}

print(f"🕐 Last Updated: {analytics_data['timestamp']}")
print(f"🔄 Active Negotiations: {analytics_data['active_negotiations']}")
print(f"✅ Completed Today: {analytics_data['completed_today']}")
print(f"📈 Approval Rate: {analytics_data['approval_rate']*100:.1f}%")
print(f"💰 Avg Customer Value: ${analytics_data['average_customer_value']:,}")
print(f"🎁 Total Cashback Issued: ${analytics_data['total_cashback_issued']:,}")

print("\\n🤖 Agent Performance Metrics:")
for agent, metrics in analytics_data['agent_performance'].items():
    print(f"   {agent.replace('_', ' ').title()}:")
    for metric, value in metrics.items():
        if isinstance(value, float) and value < 1:
            print(f"      {metric.replace('_', ' ').title()}: {value*100:.1f}%")
        else:
            print(f"      {metric.replace('_', ' ').title()}: {value}")

# Simulate trend analysis
print("\\n📈 Trend Analysis (Last 7 Days):")
for day in range(7):
    date = (current_time - timedelta(days=day)).strftime("%Y-%m-%d")
    applications = random.randint(70, 130)
    value = random.randint(40000, 90000)
    print(f"   {date}: {applications} applications, ${value:,} avg value")

print("\\n🎯 Key Insights:")
print("   • Loyalty scores >5 show 40% higher customer value")
print("   • Negotiation success rate peaks at 2-3 PM")
print("   • Weekend applications have higher loan amounts")
print("   • Credit scores 720-750 have optimal approval rates")
'''
    
    response = sandbox.process.code_run(analytics_code)
    if response.exit_code == 0:
        print("✅ Analytics dashboard generated!")
        print(response.result)
    else:
        print(f"❌ Error: {response.result}")
    
    # Demo 3: A/B Testing Framework
    print("\n🧪 DEMO 3: A/B Testing Framework")
    print("-" * 40)
    
    ab_testing_code = '''
import random
import json

print("🧪 A/B Testing: Agent Configuration Comparison")
print("=" * 50)

# Define two different agent configurations
config_a = {
    "name": "Conservative Strategy",
    "negotiation_aggressiveness": 0.3,
    "loyalty_weight": 0.9,
    "max_rate_reduction": 0.05,
    "cashback_generosity": 0.6
}

config_b = {
    "name": "Aggressive Strategy", 
    "negotiation_aggressiveness": 0.8,
    "loyalty_weight": 0.7,
    "max_rate_reduction": 0.08,
    "cashback_generosity": 0.9
}

# Simulate test results for 100 customers each
def simulate_config_results(config, num_customers=100):
    total_value = 0
    approvals = 0
    negotiations_successful = 0
    
    for i in range(num_customers):
        # Random customer profile
        fico = random.randint(580, 820)
        loyalty = random.randint(1, 10)
        loan_amount = random.randint(200000, 800000)
        
        # Simulate agent behavior based on config
        if fico > 600:  # Approval threshold
            approvals += 1
            
            # Calculate negotiation outcome
            base_rate = 7.5
            rate_reduction = config["max_rate_reduction"] * (loyalty / 10) * config["loyalty_weight"]
            final_rate = base_rate - rate_reduction
            
            cashback = loan_amount * 0.03 * config["cashback_generosity"] * (loyalty / 10)
            
            # Customer value calculation
            monthly_savings = loan_amount * (rate_reduction / 100 / 12)
            customer_value = (monthly_savings * 360) + cashback
            total_value += customer_value
            
            # Negotiation success based on aggressiveness
            if random.random() < (0.7 + config["negotiation_aggressiveness"] * 0.2):
                negotiations_successful += 1
    
    return {
        "approval_rate": approvals / num_customers,
        "negotiation_success_rate": negotiations_successful / max(approvals, 1),
        "average_customer_value": total_value / max(approvals, 1),
        "total_customer_value": total_value
    }

# Run A/B test
print("Running A/B test with 100 customers per configuration...")
print()

results_a = simulate_config_results(config_a)
results_b = simulate_config_results(config_b)

print(f"📊 {config_a['name']} Results:")
print(f"   Approval Rate: {results_a['approval_rate']*100:.1f}%")
print(f"   Negotiation Success: {results_a['negotiation_success_rate']*100:.1f}%")
print(f"   Avg Customer Value: ${results_a['average_customer_value']:,.0f}")
print(f"   Total Value Generated: ${results_a['total_customer_value']:,.0f}")

print(f"\\n📊 {config_b['name']} Results:")
print(f"   Approval Rate: {results_b['approval_rate']*100:.1f}%")
print(f"   Negotiation Success: {results_b['negotiation_success_rate']*100:.1f}%")
print(f"   Avg Customer Value: ${results_b['average_customer_value']:,.0f}")
print(f"   Total Value Generated: ${results_b['total_customer_value']:,.0f}")

# Determine winner
if results_b['total_customer_value'] > results_a['total_customer_value']:
    winner = config_b['name']
    improvement = ((results_b['total_customer_value'] - results_a['total_customer_value']) / results_a['total_customer_value']) * 100
else:
    winner = config_a['name']
    improvement = ((results_a['total_customer_value'] - results_b['total_customer_value']) / results_b['total_customer_value']) * 100

print(f"\\n🏆 Winner: {winner}")
print(f"📈 Improvement: {improvement:.1f}% better total customer value")
print("\\n✅ A/B testing complete - use winning configuration for production!")
'''
    
    response = sandbox.process.code_run(ab_testing_code)
    if response.exit_code == 0:
        print("✅ A/B testing framework executed!")
        print(response.result)
    else:
        print(f"❌ Error: {response.result}")
    
    # Demo 4: Simple Web Interface
    print("\n🌐 DEMO 4: Web Interface Setup")
    print("-" * 40)
    
    web_interface_code = '''
# Simple web interface for Game of Loans agents
print("🌐 Setting up Game of Loans Web Interface...")

# Note: In a real Daytona sandbox, you would run:
# pip install flask
# Then create actual web routes

web_interface_plan = {
    "routes": {
        "/": "Agent Dashboard - Overview of all agents",
        "/apply": "Loan Application Form",
        "/negotiate": "Real-time Negotiation Interface", 
        "/analytics": "Performance Analytics Dashboard",
        "/admin": "Agent Configuration Panel"
    },
    "features": {
        "real_time_updates": "WebSocket connections for live negotiation",
        "customer_portal": "Self-service application and tracking",
        "admin_controls": "Agent parameter adjustment",
        "reporting": "Downloadable performance reports",
        "api_endpoints": "RESTful API for integrations"
    },
    "tech_stack": {
        "backend": "Flask/FastAPI",
        "frontend": "React/Vue.js", 
        "database": "PostgreSQL/MongoDB",
        "real_time": "WebSockets/Socket.IO",
        "deployment": "Docker containers in Daytona"
    }
}

print("📋 Web Interface Architecture:")
for category, items in web_interface_plan.items():
    print(f"\\n{category.upper()}:")
    if isinstance(items, dict):
        for key, value in items.items():
            print(f"   {key}: {value}")
    else:
        print(f"   {items}")

print("\\n🚀 To implement:")
print("1. Install Flask: pip install flask")
print("2. Create app.py with routes")
print("3. Add HTML templates")
print("4. Connect to agent APIs")
print("5. Deploy in Daytona sandbox")
print("\\n✅ Web interface plan ready for implementation!")
'''
    
    response = sandbox.process.code_run(web_interface_code)
    if response.exit_code == 0:
        print("✅ Web interface planning complete!")
        print(response.result)
    else:
        print(f"❌ Error: {response.result}")
    
    print("\n🎉 Advanced Demo Complete!")
    print("=" * 60)
    print("🌐 Check your Daytona dashboard: https://app.daytona.io/dashboard/sandboxes")
    print("📁 All demo results are running in your sandbox environment")

if __name__ == "__main__":
    run_advanced_demo()
