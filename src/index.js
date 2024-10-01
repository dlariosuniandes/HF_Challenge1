const buttoncontainerDoc = document.querySelector("#button-container");
const getReplicators = (originalElement, copyElement) => [
  {
    types: ["focusin", "focusout"],
    uniAtoB: (e) => {
      copyElement.classList.toggle("focused");
    },
  },
  {
    types: ["click"],
    uniAtoB: (e) => {
      copyElement.classList.toggle("checked");
    },
    uniBtoA: (e) => {
      originalElement.checked = !originalElement.checked;
    },
    uniBtoB: (e) => {
      copyElement.classList.toggle("checked");
    },
  },
];
const createEventReplication = (parentElement) => {
  const originalElement = parentElement.querySelector(".original-element");
  const copyElement = parentElement.querySelector(".copy-element");
  const replicators = getReplicators(originalElement, copyElement);
  replicators.forEach(
    ({ types, biDir, uniAtoB, uniBtoA, uniBtoB, uniAtoA }) => {
      types.forEach((type) => {
        const combinedTrigger = (event) => {
          biDir && biDir(event);
          uniAtoB &&
            event.target.matches(".original-element, .original-element *") &&
            uniAtoB(event);
          uniBtoA &&
            event.target.matches(".copy-element, .copy-element *") &&
            uniBtoA(event);
          uniBtoB &&
            event.target.matches(".copy-element, .copy-element *") &&
            uniBtoB(event);
          uniAtoA &&
            event.target.matches(".original-element, .original-element *") &&
            uniAtoA(event);
        };
        parentElement.addEventListener(type, combinedTrigger);
      });
    }
  );
};

createEventReplication(buttoncontainerDoc);
