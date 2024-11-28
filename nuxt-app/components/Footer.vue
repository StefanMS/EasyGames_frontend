<template>
  <footer class="footer">
    <div class="footer-content">
      <span class="footer-text">© 2024 EasyGames</span>
      <nav class="footer-nav">
        <button class="footer-link" @click="navigateTutorial">Tutorial</button>
        <button class="footer-link" @click="navigateAbout">About</button>
        <button class="footer-link" @click="navigateContact">Contact</button>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import '@/assets/css/footer.css'

const router = useRouter();

const navigateTutorial = () => {
  router.push('/tutorial');
};

const navigateAbout = () => {
  router.push('/about');
};

const navigateContact = () => {
  router.push('/contact');
};

</script>
  