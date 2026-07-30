const typingText = document.getElementById("typing-text");

const roles = [
    "Artificaial Intelligence Student",
    "Machine Learning Student",
    "Web Developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        // Type the text
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        // Start deleting after the word is completely typed
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        // Delete the text
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        // Move to the next role
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 70 : 120);
}

typeEffect();

document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(
    ".skill1, .skill2, .skill3, .skill4"
  );

  const skillItems = document.querySelectorAll(".skill-list li");

  // Initial card animation
  skillCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });

  // Skill item click effect
  skillItems.forEach((item) => {
    item.addEventListener("click", () => {
      skillItems.forEach((skill) => {
        skill.classList.remove("active-skill");
      });

      item.classList.add("active-skill");
    });
  });

  // Mouse movement effect on skill cards
  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const experienceCards = document.querySelectorAll(".experience1");
  const skillItems = document.querySelectorAll(".exp-skill1 li");
  const certificateButtons = document.querySelectorAll(".experience1 button");

  // Animate experience cards when they enter the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  experienceCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition =
      `opacity 0.7s ease ${index * 0.15}s, 
       transform 0.7s ease ${index * 0.15}s,
       box-shadow 0.3s ease,
       border-color 0.3s ease`;

    observer.observe(card);
  });

  // Add active class to the card when animation starts
  experienceCards.forEach((card) => {
    const checkVisibility = () => {
      const rect = card.getBoundingClientRect();

      if (
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > 0
      ) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    };

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
  });

  // Skill tag click interaction
  skillItems.forEach((skill) => {
    skill.addEventListener("click", () => {
      skill.classList.toggle("active-skill");
    });
  });

  // Certificate button interaction
  certificateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Certificate Opened ✓";

      setTimeout(() => {
        button.textContent = "Certificate";
      }, 2000);
    });
  });
});