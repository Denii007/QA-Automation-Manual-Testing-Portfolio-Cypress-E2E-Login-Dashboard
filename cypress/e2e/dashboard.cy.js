describe("dashboard page test cases", () => {
    it("Do Login with Correct values", () => {
        cy.visit("http://localhost:3000");
        cy.get("input[name='email']").type("user@react.test");
        cy.get("input[name='password']").type("password");
        cy.get("button").click();

        cy.on("window:alert", (text) => {
            expect(text).to.contains("welcome");
        });

        cy.url().should("eq", "http://localhost:3000/dashboard");
    });

    it("Found No Post For The First Time", () => {
        cy.contains("Found 0 photos");
    });

    it("Contains image url and image description input and publish button", () => {
        cy.get("input[name='image']")
            .should("be.visible")
            .and("have.attr", "type", "url")
            .and("have.attr", "required", "required")
            .and("have.attr", "placeholder", "Image URL");

        cy.get("input[name='desc']")
            .should("be.visible")
            .and("have.attr", "type", "text")
            .and("have.attr", "required", "required")
            .and("have.attr", "placeholder", "What's on your mind?");

        cy.get("button")
            .should("be.visible")
            .contains("Publish")
            .should("have.css", "background-color", "rgb(79, 70, 229)")
            .and("have.css", "color", "rgb(255, 255, 255)");
    });

    it("Upload Some Photos", () => {
        const photos = [
            {
                imageValue:"https://plus.unsplash.com/premium_photo-1754253677826-32cf289d143b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        descriptionValue:"image 1: lorem ipsum ",
            },
            {
                imageValue:"https://images.unsplash.com/photo-1758797957534-e1242d8e11b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
        descriptionValue:"image 2: lorem ipsum ",
            },
        ];

        photos.forEach(({ imageValue, descriptionValue}) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const description = cy.get("input[name='desc']");
            description.type(descriptionValue);

            const button = cy.get("button");
            button.click();

            // check uploaded  image is exist
            cy.get("img").should('have.attr', 'src', imageValue);
            cy.contains(descriptionValue);

        });
        cy.contains(`Found ${photos.length} photos`);
    });
});
