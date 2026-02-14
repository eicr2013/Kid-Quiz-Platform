import { QuestionTemplate } from '@/types/question-template';
import { comprehensiveScienceTemplates } from './science-templates-comprehensive';

/**
 * Main Science Templates Export
 * Now using comprehensive templates with 85+ verified questions from exam papers
 */
export const scienceTemplates: QuestionTemplate[] = comprehensiveScienceTemplates;

// Legacy templates (replaced with exam-based versions above)
export const scienceLegacyTemplates: QuestionTemplate[] = [
  // ========== ROCKS AND SOILS ==========
  {
    id: 'rocks-types-easy',
    topic: 'Rocks and Soils',
    category: 'Rocks and Soils',
    difficulty: 'Easy',
    questionTemplate: 'Which type of rock is formed when magma cools and hardens?',
    variables: {},
    correctAnswerFormula: 'Igneous rock',
    wrongAnswers: ['Sedimentary rock', 'Metamorphic rock', 'Fossil rock'],
    methodSteps: [
      'Igneous rocks are formed from molten magma.',
      'When magma (hot liquid rock) cools down, it hardens.',
      'This process creates igneous rocks like granite and basalt.',
    ],
  },
  {
    id: 'rocks-properties-easy',
    topic: 'Rocks and Soils',
    category: 'Rocks and Soils',
    difficulty: 'Easy',
    questionTemplate: 'Which rock property means water can pass through it?',
    variables: {},
    correctAnswerFormula: 'Permeable',
    wrongAnswers: ['Impermeable', 'Hard', 'Soft'],
    methodSteps: [
      'Permeable means water can pass through the rock.',
      'Rocks like sandstone and chalk are permeable.',
      'Impermeable means water cannot pass through.',
    ],
  },
  {
    id: 'rocks-sedimentary-medium',
    topic: 'Rocks and Soils',
    category: 'Rocks and Soils',
    difficulty: 'Medium',
    questionTemplate: 'How are sedimentary rocks formed?',
    variables: {},
    correctAnswerFormula: 'By layers cementing together over time',
    wrongAnswers: [
      'When magma cools and hardens',
      'When rocks change due to heat and pressure',
      'When rocks break into pieces',
    ],
    methodSteps: [
      'Sedimentary rocks form from layers of sediment.',
      'Sediments (small pieces of rock, sand, shells) settle in layers.',
      'Over time, these layers cement together to form rocks like sandstone.',
    ],
  },
  {
    id: 'rocks-metamorphic-medium',
    topic: 'Rocks and Soils',
    category: 'Rocks and Soils',
    difficulty: 'Medium',
    questionTemplate: 'Slate is an example of which type of rock?',
    variables: {},
    correctAnswerFormula: 'Metamorphic rock',
    wrongAnswers: ['Igneous rock', 'Sedimentary rock', 'Permeable rock'],
    methodSteps: [
      'Slate is a metamorphic rock.',
      'Metamorphic rocks form when other rocks change due to heat and pressure.',
      'Slate forms from shale under pressure.',
    ],
  },

  // ========== LIVING THINGS & LIFE PROCESSES ==========
  {
    id: 'life-processes-respiration-easy',
    topic: 'Living Things',
    category: 'Living Things',
    difficulty: 'Easy',
    questionTemplate: 'Which life process involves animals breathing in oxygen?',
    variables: {},
    correctAnswerFormula: 'Respiration',
    wrongAnswers: ['Nutrition', 'Reproduction', 'Movement'],
    methodSteps: [
      'Respiration is the process of breathing.',
      'Animals breathe in oxygen from the air.',
      'They use oxygen to get energy from food.',
    ],
  },
  {
    id: 'life-processes-nutrition-easy',
    topic: 'Living Things',
    category: 'Living Things',
    difficulty: 'Easy',
    questionTemplate: 'Which life process involves plants making their own food?',
    variables: {},
    correctAnswerFormula: 'Nutrition',
    wrongAnswers: ['Respiration', 'Growth', 'Reproduction'],
    methodSteps: [
      'Nutrition is how living things get food.',
      'Plants make their own food using sunlight, water, and air.',
      'This process is called photosynthesis.',
    ],
  },
  {
    id: 'life-processes-reproduction-medium',
    topic: 'Living Things',
    category: 'Living Things',
    difficulty: 'Medium',
    questionTemplate: 'Frogs laying eggs is an example of which life process?',
    variables: {},
    correctAnswerFormula: 'Reproduction',
    wrongAnswers: ['Nutrition', 'Growth', 'Respiration'],
    methodSteps: [
      'Reproduction is how living things make new living things.',
      'Animals reproduce by laying eggs or giving birth.',
      'Frogs lay eggs that hatch into tadpoles.',
    ],
  },

  // ========== ANIMALS ==========
  {
    id: 'animals-vertebrates-easy',
    topic: 'Animals',
    category: 'Animals',
    difficulty: 'Easy',
    questionTemplate: 'Which animal group has a backbone?',
    variables: {},
    correctAnswerFormula: 'Vertebrates',
    wrongAnswers: ['Invertebrates', 'Molluscs', 'Insects'],
    methodSteps: [
      'Vertebrates are animals with a backbone (spine).',
      'Examples: fish, birds, mammals, reptiles, amphibians.',
      'Invertebrates do NOT have a backbone.',
    ],
  },
  {
    id: 'animals-features-pincers-easy',
    topic: 'Animals',
    category: 'Animals',
    difficulty: 'Easy',
    questionTemplate: 'Which animal has pincers?',
    variables: {},
    correctAnswerFormula: 'Lobster',
    wrongAnswers: ['Moth', 'Snake', 'Butterfly'],
    methodSteps: [
      'Pincers are claw-like body parts.',
      'Lobsters, crabs, and scorpions have pincers.',
      'They use pincers to catch food and defend themselves.',
    ],
  },
  {
    id: 'animals-herbivore-medium',
    topic: 'Animals',
    category: 'Animals',
    difficulty: 'Medium',
    questionTemplate: 'What do herbivores eat?',
    variables: {},
    correctAnswerFormula: 'Plants only',
    wrongAnswers: ['Meat only', 'Plants and meat', 'Insects only'],
    methodSteps: [
      'Herbivores are animals that eat only plants.',
      'Examples: rabbits, deer, cows, elephants.',
      'They have flat teeth for grinding plants.',
    ],
  },
  {
    id: 'animals-carnivore-medium',
    topic: 'Animals',
    category: 'Animals',
    difficulty: 'Medium',
    questionTemplate: 'What do carnivores eat?',
    variables: {},
    correctAnswerFormula: 'Meat only',
    wrongAnswers: ['Plants only', 'Plants and meat', 'Seeds only'],
    methodSteps: [
      'Carnivores are animals that eat only meat.',
      'Examples: lions, tigers, eagles, sharks.',
      'They have sharp teeth for tearing meat.',
    ],
  },
  {
    id: 'animals-habitat-polar-hard',
    topic: 'Animals',
    category: 'Animals',
    difficulty: 'Hard',
    questionTemplate: 'Where do polar bears live, and what helps them survive?',
    variables: {},
    correctAnswerFormula: 'Arctic - thick fur and fat keep them warm',
    wrongAnswers: [
      'Desert - they store water in their body',
      'Rainforest - they climb trees to escape predators',
      'Grassland - they run fast to catch prey',
    ],
    methodSteps: [
      'Polar bears live in the Arctic (very cold region).',
      'They are adapted to cold: thick white fur for warmth and camouflage.',
      'They also have a thick layer of fat (blubber) to stay warm.',
    ],
  },

  // ========== HUMAN BODY ==========
  {
    id: 'teeth-incisors-easy',
    topic: 'Human Body',
    category: 'Human Body',
    difficulty: 'Easy',
    questionTemplate: 'Which teeth are used to bite into food?',
    variables: {},
    correctAnswerFormula: 'Incisors',
    wrongAnswers: ['Molars', 'Canines', 'Premolars'],
    methodSteps: [
      'Incisors are the front teeth.',
      'They are flat and sharp, used for biting and cutting food.',
      'You have 8 incisors (4 top, 4 bottom).',
    ],
  },
  {
    id: 'teeth-molars-easy',
    topic: 'Human Body',
    category: 'Human Body',
    difficulty: 'Easy',
    questionTemplate: 'Which teeth are used to grind food?',
    variables: {},
    correctAnswerFormula: 'Molars',
    wrongAnswers: ['Incisors', 'Canines', 'Lips'],
    methodSteps: [
      'Molars are the large teeth at the back of your mouth.',
      'They are flat and wide, used for grinding and crushing food.',
      'You have 12 molars (including wisdom teeth).',
    ],
  },
  {
    id: 'senses-five-easy',
    topic: 'Human Body',
    category: 'Human Body',
    difficulty: 'Easy',
    questionTemplate: 'How many senses do humans have?',
    variables: {},
    correctAnswerFormula: 'Five',
    wrongAnswers: ['Three', 'Four', 'Six'],
    methodSteps: [
      'Humans have 5 senses.',
      'The 5 senses are: sight, hearing, smell, taste, and touch.',
      'We use our senses to learn about the world around us.',
    ],
  },
  {
    id: 'senses-taste-medium',
    topic: 'Human Body',
    category: 'Human Body',
    difficulty: 'Medium',
    questionTemplate: 'Which body part do we use to taste food?',
    variables: {},
    correctAnswerFormula: 'Tongue',
    wrongAnswers: ['Mouth', 'Lips', 'Teeth'],
    methodSteps: [
      'We taste food with our tongue.',
      'The tongue has tiny taste buds that detect different flavors.',
      'The 5 basic tastes are: sweet, sour, salty, bitter, and umami.',
    ],
  },

  // ========== PLANTS ==========
  {
    id: 'plants-seed-dispersal-wind-easy',
    topic: 'Plants',
    category: 'Plants',
    difficulty: 'Easy',
    questionTemplate: 'How do dandelion seeds move to long distances?',
    variables: {},
    correctAnswerFormula: 'Wind',
    wrongAnswers: ['Water', 'Birds', 'Animals'],
    methodSteps: [
      'Dandelion seeds have fluffy parts that act like parachutes.',
      'Wind blows the seeds to different places.',
      'This helps dandelions grow in new areas.',
    ],
  },
  {
    id: 'plants-seed-dispersal-water-medium',
    topic: 'Plants',
    category: 'Plants',
    difficulty: 'Medium',
    questionTemplate: 'How do coconut seeds travel?',
    variables: {},
    correctAnswerFormula: 'Water',
    wrongAnswers: ['Wind', 'Animals eating them', 'Exploding'],
    methodSteps: [
      'Coconuts can float in water.',
      'They fall into rivers or oceans and float to new places.',
      'When they wash up on shore, they can grow into new coconut trees.',
    ],
  },

  // ========== FOOD CHAINS ==========
  {
    id: 'food-chain-producer-easy',
    topic: 'Food Chains',
    category: 'Food Chains',
    difficulty: 'Easy',
    questionTemplate: 'In a food chain, what is a producer?',
    variables: {},
    correctAnswerFormula: 'A plant that makes its own food',
    wrongAnswers: [
      'An animal that eats plants',
      'An animal that eats other animals',
      'An animal that eats both plants and animals',
    ],
    methodSteps: [
      'Producers are living things that make their own food.',
      'Plants are producers - they use sunlight to make food.',
      'Examples: grass, trees, algae.',
    ],
  },
  {
    id: 'food-chain-consumer-easy',
    topic: 'Food Chains',
    category: 'Food Chains',
    difficulty: 'Easy',
    questionTemplate: 'What is a consumer in a food chain?',
    variables: {},
    correctAnswerFormula: 'An animal that eats other living things',
    wrongAnswers: [
      'A plant that makes food',
      'A rock',
      'The sun',
    ],
    methodSteps: [
      'Consumers are living things that eat other living things.',
      'They cannot make their own food.',
      'Examples: rabbits (eat plants), foxes (eat animals).',
    ],
  },
  {
    id: 'food-chain-predator-medium',
    topic: 'Food Chains',
    category: 'Food Chains',
    difficulty: 'Medium',
    questionTemplate: 'In a food chain: Grass → Rabbit → Fox, which is the predator?',
    variables: {},
    correctAnswerFormula: 'Fox',
    wrongAnswers: ['Grass', 'Rabbit', 'All of them'],
    methodSteps: [
      'A predator is an animal that hunts and eats other animals.',
      'In this food chain, the fox hunts and eats the rabbit.',
      'The rabbit is the prey (animal that is hunted).',
    ],
  },
  {
    id: 'food-chain-herbivore-hard',
    topic: 'Food Chains',
    category: 'Food Chains',
    difficulty: 'Hard',
    questionTemplate: 'In a food web with grass, mice, owls, and foxes, name two herbivores.',
    variables: {},
    correctAnswerFormula: 'Mice and grasshoppers',
    wrongAnswers: [
      'Owls and foxes',
      'Grass and mice',
      'Owls and grasshoppers',
    ],
    methodSteps: [
      'Herbivores are animals that eat only plants.',
      'In this food web, mice eat grass (herbivore).',
      'Grasshoppers also eat grass (herbivore).',
      'Owls and foxes eat other animals (carnivores).',
    ],
  },

  // ========== WATER CYCLE ==========
  {
    id: 'water-evaporation-easy',
    topic: 'Water Cycle',
    category: 'Water Cycle',
    difficulty: 'Easy',
    questionTemplate: 'What happens when water is heated?',
    variables: {},
    correctAnswerFormula: 'It evaporates (turns into water vapor)',
    wrongAnswers: ['It freezes', 'It condenses', 'It melts'],
    methodSteps: [
      'When water is heated, it evaporates.',
      'Evaporation means liquid water turns into water vapor (gas).',
      'Water vapor is invisible and goes into the air.',
    ],
  },
  {
    id: 'water-melting-easy',
    topic: 'Water Cycle',
    category: 'Water Cycle',
    difficulty: 'Easy',
    questionTemplate: 'What is it called when ice changes into water?',
    variables: {},
    correctAnswerFormula: 'Melting',
    wrongAnswers: ['Freezing', 'Evaporating', 'Condensing'],
    methodSteps: [
      'When ice warms up, it melts.',
      'Melting is when a solid (ice) turns into a liquid (water).',
      'This happens when the temperature rises above 0°C.',
    ],
  },
  {
    id: 'water-freezing-medium',
    topic: 'Water Cycle',
    category: 'Water Cycle',
    difficulty: 'Medium',
    questionTemplate: 'What will happen if we keep water in the freezer?',
    variables: {},
    correctAnswerFormula: 'It will freeze (turn into ice)',
    wrongAnswers: ['It will evaporate', 'It will condense', 'It will disappear'],
    methodSteps: [
      'When water gets very cold, it freezes.',
      'Freezing is when liquid water turns into solid ice.',
      'This happens at 0°C or below.',
    ],
  },
  {
    id: 'water-condensation-medium',
    topic: 'Water Cycle',
    category: 'Water Cycle',
    difficulty: 'Medium',
    questionTemplate: 'What is it called when water vapor cools and turns back into water?',
    variables: {},
    correctAnswerFormula: 'Condensation',
    wrongAnswers: ['Evaporation', 'Freezing', 'Melting'],
    methodSteps: [
      'Condensation is when water vapor (gas) cools and turns into liquid water.',
      'This happens when warm water vapor touches a cold surface.',
      'Example: water droplets on a cold glass of juice.',
    ],
  },

  // ========== MATERIALS ==========
  {
    id: 'materials-waterproof-easy',
    topic: 'Materials',
    category: 'Materials',
    difficulty: 'Easy',
    questionTemplate: 'What property should a good raincoat have?',
    variables: {},
    correctAnswerFormula: 'Waterproof',
    wrongAnswers: ['Absorbent', 'Heavy', 'Rough'],
    methodSteps: [
      'A raincoat should be waterproof.',
      'Waterproof means water cannot pass through the material.',
      'This keeps you dry in the rain.',
    ],
  },
  {
    id: 'materials-absorbent-easy',
    topic: 'Materials',
    category: 'Materials',
    difficulty: 'Easy',
    questionTemplate: 'Which material is best for making towels?',
    variables: {},
    correctAnswerFormula: 'Absorbent material (like cotton)',
    wrongAnswers: ['Waterproof material', 'Hard material', 'Stretchy material'],
    methodSteps: [
      'Towels need to be absorbent.',
      'Absorbent means the material can soak up water.',
      'Cotton is a good absorbent material for towels.',
    ],
  },
  {
    id: 'materials-clay-pots-medium',
    topic: 'Materials',
    category: 'Materials',
    difficulty: 'Medium',
    questionTemplate: 'Which material is suitable for making pots?',
    variables: {},
    correctAnswerFormula: 'Clay',
    wrongAnswers: ['Metal', 'Wood', 'Fabric'],
    methodSteps: [
      'Clay is soft when wet and can be shaped easily.',
      'When clay is heated (fired in a kiln), it becomes hard.',
      'This makes clay perfect for making pots and bowls.',
    ],
  },

  // ========== FORCES ==========
  {
    id: 'forces-bending-easy',
    topic: 'Forces',
    category: 'Forces',
    difficulty: 'Easy',
    questionTemplate: 'What force is used when you curve a ruler?',
    variables: {},
    correctAnswerFormula: 'Bending',
    wrongAnswers: ['Twisting', 'Squeezing', 'Stretching'],
    methodSteps: [
      'Bending is when you curve or fold something.',
      'When you curve a ruler, you are bending it.',
      'Bending changes the shape but not the size.',
    ],
  },
  {
    id: 'forces-twisting-easy',
    topic: 'Forces',
    category: 'Forces',
    difficulty: 'Easy',
    questionTemplate: 'What force is used when you open a bottle cap?',
    variables: {},
    correctAnswerFormula: 'Twisting',
    wrongAnswers: ['Bending', 'Squeezing', 'Pulling'],
    methodSteps: [
      'Twisting is a turning force.',
      'When you turn a bottle cap, you are twisting it.',
      'Twisting is used to open and close things.',
    ],
  },
  {
    id: 'forces-squeezing-medium',
    topic: 'Forces',
    category: 'Forces',
    difficulty: 'Medium',
    questionTemplate: 'What happens when you squeeze a sponge?',
    variables: {},
    correctAnswerFormula: 'It becomes smaller and water comes out',
    wrongAnswers: [
      'It becomes bigger',
      'It becomes harder',
      'Nothing happens',
    ],
    methodSteps: [
      'Squeezing is a pushing force from two sides.',
      'When you squeeze a sponge, you compress it.',
      'This makes it smaller and pushes water out.',
    ],
  },
];

export function getScienceTemplates() {
  return scienceTemplates; // Returns exam-based templates
}

export function getScienceCategories() {
  const categories = new Set(scienceTemplates.map(t => t.category));
  return Array.from(categories);
}

// For backward compatibility
export function getLegacyScienceTemplates() {
  return scienceLegacyTemplates;
}
