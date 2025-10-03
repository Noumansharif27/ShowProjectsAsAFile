// var myCode = () => {
//   const folders = document.querySelectorAll(".folder");

//   const folder = document.querySelectorAll(".folder");

//   folder.forEach((element, index) => {
//     element.addEventListener("mouseover", () => {
//       console.log(`Hovered element index: ${index}`);
//       // You can also do your GSAP animation here
//     });
//   });

//   folders.forEach((folder) => {
//     const folderBottom = folder.querySelector(".folder-bottom");
//     folderBottom.addEventListener("mouseover", () => {
//       const image0 = folder.querySelector(".image-0");
//       const image1 = folder.querySelector(".image-1");
//       const image2 = folder.querySelector(".image-2");

//       gsap.to(image0, {
//         y: "-120%",
//         ease: "power4.out",
//         duration: 0.5,
//         rotate: "-10deg",
//       });

//       gsap.to(image1, {
//         y: "-110%",
//         ease: "power4.out",
//         duration: 0.5,
//         rotate: "10deg",
//       });
//       gsap.to(image2, {
//         y: "-120%",
//         ease: "power4.out",
//         duration: 0.5,
//         rotate: "0deg",
//       });
//     });

//     folder.addEventListener("mouseout", () => {
//       gsap.to(".image-0", {
//         y: "10%",
//         ease: "easeInOut",
//         rotate: "0deg",
//       });

//       gsap.to(".image-1", {
//         y: "10%",
//         ease: "easeInOut",
//         rotate: "0deg",
//       });
//       gsap.to(".image-2", {
//         y: "10%",
//         ease: "easeInOut",
//         rotate: "0deg",
//       });
//     });
//   });
// };

// const folders = document.querySelectorAll(".folder");
// const folderWrappers = document.querySelectorAll(".folder-wrapper");

// let isMobile = window.innerWidth < 1000;

// function setInitialPositiona() {
//   gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
// }

// // setInitialPositiona();

// folders.forEach((folder, index) => {
//   const previewImages = folder.querySelectorAll(".folder-preview-img");

//   folder.addEventListener("mouseenter", () => {
//     if (isMobile) return;
//     folder.forEach((syblingFolder) => {
//       if (syblingFolder != folder) {
//         syblingFolder.classList.add("disabled");
//       }
//     });
//   });

//   gsap.to(folderWrappers[index], {
//     y: 0,
//     duration: 0.25,
//     ease: "back.out(1.7)",
//   });

//   previewImages.forEach((img, imgIndex) => {
//     let rotation;
//     if (imgIndex === 0) {
//       rotation: gsap.utils.random(-20, 20);
//     } else if (imgIndex === 1) {
//       rotation: gsap.utils.random(-10, 10);
//     } else {
//       rotation: gsap.utils.random(10, 20);
//     }

//     gsap.to(img, {
//       y: "-100%",
//       rotation: rotation,
//       duration: 0.5,
//       ease: "back.out(1.7)",
//       delay: imgIndex * 0.025,
//     });
//   });

//   folder.addEventListener("mouseleave", () => {
//     if (isMobile) return;

//     folder.forEach((syblingFolder) => {
//       syblingFolder.classList.remove("disabled");
//     });

//     gsap.to(folderWrappers[index], {
//       y: 25,
//       duration: 0.25,
//       ease: "back.out(1.7)",
//     });

//     previewImages.forEach((img, imgIndex) => {
//       gsap.to(img, {
//         y: "0%",
//         rotation: 0,
//         duration: 0.25,
//         ease: "back.out(1.7)",
//         delay: imgIndex * 0.05,
//       });
//     });
//   });
// });

const folders = document.querySelectorAll(".folder");
const folderWrappers = document.querySelectorAll(".folder-wrapper");

let isMobile = window.innerWidth < 1000;

function setInitialPositions() { // Changed function name for clarity
  gsap.set(folderWrappers, { y: isMobile ? 0 : 25 });
}

// Set initial positions on page load
setInitialPositions();

folders.forEach((folder, index) => {
  const previewImages = folder.querySelectorAll(".folder-preview-img");

  folder.addEventListener("mouseenter", () => {
    if (isMobile) return;

    // Loop through all folders to disable the non-hovered ones
    folders.forEach((siblingFolder) => {
      if (siblingFolder !== folder) {
        siblingFolder.classList.add("disabled");
      }
    });

    // Animate the hovered folder wrapper
    gsap.to(folderWrappers[index], {
      y: 0,
      duration: 0.25,
      ease: "back.out(1.7)",
    });

    // Animate the preview images inside the hovered folder
    previewImages.forEach((img, imgIndex) => {
      let rotation;
      if (imgIndex === 0) {
        rotation = gsap.utils.random(-20, -10);
      } else if (imgIndex === 1) {
        rotation = gsap.utils.random(-10, 10);
      } else {
        rotation = gsap.utils.random(10, 20);
      }

      gsap.to(img, {
        y: "-100%",
        rotation: rotation,
        duration: 0.5,
        ease: "back.out(1.7)",
        delay: imgIndex * 0.025,
      });
    });
  });

  folder.addEventListener("mouseleave", () => {
    if (isMobile) return;

    // Remove the disabled class from all folders
    folders.forEach((siblingFolder) => {
      siblingFolder.classList.remove("disabled");
    });

    // Animate the folder wrapper back to its initial position
    gsap.to(folderWrappers[index], {
      y: 25,
      duration: 0.25,
      ease: "back.out(1.7)",
    });

    // Animate the preview images back to their initial state
    previewImages.forEach((img, imgIndex) => {
      gsap.to(img, {
        y: "0%",
        rotation: 0,
        duration: 0.25,
        ease: "back.out(1.7)",
        delay: imgIndex * 0.05,
      });
    });
  });
});

// Add a resize event listener
window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth < 1000;
  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
    setInitialPositions();
    folders.forEach((f) => {
      f.classList.remove("disabled");
    });
    // Reset image animations
    const allPreviewImages = document.querySelectorAll(".folder-preview-img");
    gsap.set(allPreviewImages, { y: "0%", rotation: 0 });
  }
});