(function () {
    const TABS_SELECTOR =
        '.monaco-workbench .part.editor > .content .editor-group-container.active > .title';
    const EDITOR_SELECTOR = '.monaco-editor';

    function updateActiveTabLabel() {
        const label = document.querySelector(
            `${TABS_SELECTOR} .tabs-container > .tab.active .label-name`
        );
        if (label) {
            label.setAttribute('data-text', label.textContent);
        }
    }

    function updateMtk7Elements() {
        document.querySelectorAll('.mtk7').forEach((el) => {
            el.setAttribute('data-text', el.textContent);
        });
    }

    const observer = new MutationObserver(() => {
        updateActiveTabLabel();
    });
    const editorObserver = new MutationObserver(() => {
        updateMtk7Elements();
    });
    let started = false;
    const startObserving = (tabsContainer, editorContainers) => {
        observer.observe(tabsContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class'],
        });

        editorContainers.forEach((con) => {
            editorObserver.observe(con, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class'],
            });
        });

        updateActiveTabLabel();
        updateMtk7Elements();
    };

    const waitForTabsContainer = () => {
        observer.disconnect();
        editorObserver.disconnect();

        const tabsContainer = document.querySelector(TABS_SELECTOR);
        const editorContainers = document.querySelectorAll(EDITOR_SELECTOR);
        console.log(editorContainers);

        if (tabsContainer && editorContainers) {
            started = true;
            startObserving(tabsContainer, editorContainers);
        }

        if (started) setTimeout(waitForTabsContainer, 5000);
        else setTimeout(waitForTabsContainer, 500);
    };

    waitForTabsContainer();
})();
