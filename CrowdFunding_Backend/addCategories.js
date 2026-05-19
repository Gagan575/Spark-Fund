// Script to add default categories via API (one by one)
// Usage: node addCategories.js

const axios = require('axios');
const jwt = require('jsonwebtoken');

// Backend configuration
const API_URL = 'http://localhost:5000';
const JWT_SECRET = 'SparkFund';

// Generate admin token
const ADMIN_TOKEN = jwt.sign(
    { email: 'admin@gmail.com', role: 'admin' },
    JWT_SECRET
);

const categories = [
    {
        categoryName: "Education",
        image: "https://via.placeholder.com/300?text=Education",
        description: "Learning and educational initiatives"
    },
    {
        categoryName: "Agriculture",
        image: "https://via.placeholder.com/300?text=Agriculture",
        description: "Farming and agricultural projects"
    },
    {
        categoryName: "E-Commerce",
        image: "https://via.placeholder.com/300?text=E-Commerce",
        description: "Online business and retail initiatives"
    },
    {
        categoryName: "AI",
        image: "https://via.placeholder.com/300?text=AI",
        description: "Artificial Intelligence and machine learning projects"
    },
    {
        categoryName: "IoT",
        image: "https://via.placeholder.com/300?text=IoT",
        description: "Internet of Things and smart device projects"
    },
    {
        categoryName: "Healthcare",
        image: "https://via.placeholder.com/300?text=Healthcare",
        description: "Medical and health-related initiatives"
    },
    {
        categoryName: "Technology",
        image: "https://via.placeholder.com/300?text=Technology",
        description: "Tech startups and software development"
    },
    {
        categoryName: "Green Energy",
        image: "https://via.placeholder.com/300?text=Green+Energy",
        description: "Renewable and sustainable energy projects"
    }
];

const addCategoryOneByOne = async () => {
    try {
        console.log("🚀 Adding categories one by one...\n");
        
        let successCount = 0;
        let failureCount = 0;

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            console.log(`[${i + 1}/${categories.length}] Adding "${category.categoryName}"...`);

            try {
                const response = await axios.post(
                    `${API_URL}/admin/category/add`,
                    {
                        categoryName: category.categoryName,
                        description: category.description
                    },
                    {
                        headers: {
                            'Authorization': ADMIN_TOKEN,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data.success) {
                    console.log(`  ✅ Success - ID: ${response.data.data._id}`);
                    successCount++;
                } else {
                    console.log(`  ⚠️ Skipped - ${response.data.message}`);
                }
            } catch (error) {
                failureCount++;
                if (error.response?.status === 409) {
                    console.log(`  ⚠️ Already exists`);
                } else {
                    console.log(`  ❌ Error - ${error.response?.data?.message || error.message}`);
                }
            }
        }

        console.log("\n" + "=".repeat(50));
        console.log(`✅ Completed!`);
        console.log(`   Added: ${successCount}`);
        console.log(`   Failed/Skipped: ${failureCount}`);
        console.log("=".repeat(50));

    } catch (error) {
        console.error("❌ Fatal error:", error.message);
    }
};

addCategoryOneByOne();
