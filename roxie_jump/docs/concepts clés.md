# Concepts clés :

## 🔑 Concept 1 : Three.js - Qu’est-ce que c’est ?

### Métaphore : Si JavaScript c’est comme peindre sur une toile plate (HTML/CSS), Three.js c’est un studio de cinéma en 3D.

Tu as :
	•	🎥 Une caméra qui regarde la scène
	•	🎭 Une scène (l’espace 3D)
	•	💡 Des lumières qui illuminent
	•	🎨 Des objets 3D (cubes, sphères, personnages)
	•	🌈 Un renderer qui affiche tout sur ton écran

```markdown
┌─────────────────────────────────────┐
│         3D SCENE (Three.js)         │
│                                     │
│    💡 LIGHT                         │
│                                     │
│        🎮 ROXIE (sphere)            │
│                                     │
│    ▬▬▬ PLATFORM 1 ▬▬▬               │
│                                     │
│    ▬▬▬ PLATFORM 2 ▬▬▬               │
│                                     │
│    🎥 CAMERA                        │
└─────────────────────────────────────┘

```

## 🔑 Concept 2 : Boucle de jeu (Game Loop)

### Métaphore : Comme une animation flip-book. Chaque page est une “frame” (60 fois par seconde).

```markdown
┌─────────────────────────┐
│  GAME LOOP (60x/sec)    │
│─────────────────────────│
│ 1. Capturer input       │ ← Clavier/souris
│ 2. Appliquer physique   │ ← Gravité, vitesse
│ 3. Mettre à jour pos.   │ ← Roxie se déplace
│ 4. Vérifier collisions  │ ← Saute sur plateforme?
│ 5. Dessiner la scène    │ ← Affiche tout
│ 6. Retour à l'étape 1   │ ← Repeat
└─────────────────────────┘

```

## 🔑 Concept 3 : Vecteurs & Positions

### Métaphore : Un vecteur c’est comme une adresse GPS en 3D.

```javascript
Position de Roxie = (x: 0, y: 5, z: 0)
                     ↑     ↑     ↑
           horizontale verticale profondeur

```

Quand Roxie saute, on modifie sa position Y dans la boucle de jeu.
