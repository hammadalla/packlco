const enContent = {
            categories: [
                { name: "Account Setup", icon: "fa-user-cog" },
                { name: "Create Shipment", icon: "fa-box" },
                { name: "Return Shipments", icon: "fa-undo" },
                { name: "Canceled Shipments", icon: "fa-ban" },
                { name: "All Shipments", icon: "fa-truck" },
                { name: "Price Calculator", icon: "fa-calculator" },
                { name: "Wallet Recharge", icon: "fa-wallet" },
                { name: "Contact Customer Service", icon: "fa-headset" },
                { name: "Contact Technical Support", icon: "fa-wrench" },
                { name: "Contact Management", icon: "fa-user-tie" }
            ],
            articles: [
                {
                    id: 1,
                    cat: "Account Setup",
                    title: "Change Your Account Settings",
                    intro: "Update your name, email, phone number, or password.",
                    steps: [
                        "Go to your account settings page.",
                        "Click 'Edit' next to the information you want to update.",
                        "Follow the on-screen instructions and click Save."
                    ]
                },
                {
                    id: 2,
                    cat: "Account Setup",
                    title: "Reset Your Password",
                    intro: "If you cannot log in, you can reset your password.",
                    steps: [
                        "Go to the login page.",
                        "Click 'Forgot your password?'.",
                        "Follow the instructions to reset it."
                    ],
                    link: "https://example.com/reset-password"
                },
                {
                    id: 3,
                    cat: "Create Shipment",
                    title: "How to Create a New Shipment",
                    intro: "Follow these steps to create a new shipment.",
                    steps: [
                        "Go to the Shipments page.",
                        "Click 'Create Shipment'.",
                        "Fill in shipment details and save."
                    ]
                },
                {
                    id: 4,
                    cat: "Return Shipments",
                    title: "Handling Return Shipments",
                    intro: "Steps to manage returned shipments.",
                    steps: [
                        "Open the 'Return Shipments' page.",
                        "Review the status of each shipment.",
                        "Choose to resend or cancel."
                    ]
                },
                {
                    id: 5,
                    cat: "Canceled Shipments",
                    title: "View Canceled Shipments",
                    intro: "Check details of canceled shipments.",
                    steps: [
                        "Go to 'Canceled Shipments'.",
                        "Review the list of canceled orders.",
                        "Contact support if you need further details."
                    ]
                },
                {
                    id: 6,
                    cat: "All Shipments",
                    title: "View All Shipments",
                    intro: "See a list of all shipments you’ve made.",
                    steps: [
                        "Go to 'All Shipments' page.",
                        "Use filters to find specific shipments.",
                        "Click a shipment to view details."
                    ]
                },
                {
                    id: 7,
                    cat: "Price Calculator",
                    title: "How to Use the Price Calculator",
                    intro: "Calculate shipping costs easily.",
                    steps: [
                        "Enter package weight and distance.",
                        "Select a shipping method.",
                        "Click 'Calculate' to see the price."
                    ]
                },
                {
                    id: 8,
                    cat: "Wallet Recharge",
                    title: "Recharge Your Wallet",
                    intro: "Add balance to your wallet.",
                    steps: [
                        "Go to 'Wallet' section.",
                        "Click 'Recharge Wallet'.",
                        "Select payment method and confirm."
                    ]
                },
                {
                    id: 9,
                    cat: "Contact Customer Service",
                    title: "Ways to Contact Customer Service",
                    intro: "You can reach our customer service team easily.",
                    steps: [
                        "Go to 'Contact Us' page.",
                        "Choose contact method: phone or email.",
                        "Submit your request and wait for a response."
                    ]
                },
                {
                    id: 10,
                    cat: "Contact Technical Support",
                    title: "How to Reach Technical Support",
                    intro: "Get help with technical issues.",
                    steps: [
                        "Visit 'Support' section.",
                        "Describe your technical issue.",
                        "Submit the form and wait for assistance."
                    ]
                },
                {
                    id: 11,
                    cat: "Contact Management",
                    title: "Contacting the Management Team",
                    intro: "For business or partnership inquiries.",
                    steps: [
                        "Go to 'Contact Management'.",
                        "Fill in your details and message.",
                        "Submit the request."
                    ]
                }
            ]
        };

        const content = enContent;
        const categoriesEl = document.getElementById("categories");
        const resultsEl = document.getElementById("results");
        const countEl = document.getElementById("count");
        const listView = document.getElementById("listView");
        const articleView = document.getElementById("articleView");

        content.categories.forEach(cat => {
            const item = document.createElement("a");
            item.className = "list-group-item list-group-item-action";
            item.innerHTML = `<i class="fa-solid ${cat.icon} mr-2"></i> ${cat.name}`;
            item.addEventListener("click", () => {
                const filtered = content.articles.filter(a => a.cat === cat.name);
                renderList(filtered);
            });
            categoriesEl.appendChild(item);
        });

        function renderList(items) {
            resultsEl.innerHTML = "";
            items.forEach(a => {
                const col = document.createElement("div");
                col.className = "col-md-6 mb-3";
                col.innerHTML = `
                    <div class="card-article p-3 shadow-sm" onclick="openArticle(${a.id})">
                        <h6>${a.title}</h6>
                        <p>${a.intro}</p>
                    </div>`;
                resultsEl.appendChild(col);
            });
            countEl.textContent = items.length;
        }

        window.openArticle = function (id) {
            const a = content.articles.find(x => x.id === id);
            if (!a) return;
            document.getElementById("articleTitle").textContent = a.title;
            document.getElementById("articleIntro").textContent = a.intro;
            document.getElementById("crumbs").textContent = `${a.cat} › ${a.title}`;
            const stepsEl = document.getElementById("articleSteps");
            stepsEl.innerHTML = "";
            a.steps.forEach(s => {
                const li = document.createElement("li");
                li.textContent = s;
                stepsEl.appendChild(li);
            });

            const extraLink = document.getElementById("extraLink");
            if (a.link) {
                extraLink.href = a.link;
                extraLink.textContent = "Reset your password";
                extraLink.style.display = "inline-block";
            } else {
                extraLink.style.display = "none";
            }

            listView.style.display = "none";
            articleView.style.display = "block";
        };

        document.getElementById("backBtn").addEventListener("click", () => {
            articleView.style.display = "none";
            listView.style.display = "block";
        });

        document.getElementById("searchBtn").addEventListener("click", doSearch);
        document.getElementById("search").addEventListener("keydown", e => {
            if (e.key === "Enter") doSearch();
        });

        function doSearch() {
            const q = document.getElementById("search").value.trim().toLowerCase();
            if (!q) return renderList(content.articles);
            const res = content.articles.filter(a =>
                (a.title + " " + a.intro + " " + a.cat).toLowerCase().includes(q)
            );
            renderList(res);
        }

        renderList(content.articles);