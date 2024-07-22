<script setup>
function initialCluster() {
  const script = document.createElement("script");
  script.src = "https://api.longdo.com/map3/?key=1e7c1b91542a627c2f556824f98e9977";
  script.id = "mapv3";
  script.type = "text/javascript"
  document.head.appendChild(script);

  script.onload = () => {

  };
}

</script>

<template>
    
</template>