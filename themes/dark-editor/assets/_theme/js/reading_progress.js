(() => {
    const storageKey = "cowards-guide:last-chapter";
    const chapterPage = document.querySelector("[data-chapter-path]");

    if (chapterPage) {
        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify({
                    path: chapterPage.dataset.chapterPath,
                    title: chapterPage.dataset.chapterTitle,
                }),
            );
        } catch (error) {
            console.error("Could not save reading progress.", error);
        }
    }

    const continueReading = document.querySelector("#continue-reading");
    if (!continueReading) {
        return;
    }

    try {
        const savedProgress = localStorage.getItem(storageKey);
        if (!savedProgress) {
            return;
        }

        const progress = JSON.parse(savedProgress);
        if (
            typeof progress.path !== "string" ||
            !progress.path.startsWith("/") ||
            progress.path.startsWith("//") ||
            typeof progress.title !== "string"
        ) {
            return;
        }

        const link = continueReading.querySelector(".continue-reading-link");
        link.href = progress.path;
        link.querySelector("strong").textContent = progress.title;
        continueReading.hidden = false;
    } catch (error) {
        console.error("Could not restore reading progress.", error);
    }
})();
