const budgetMap = {
    Budget: 2000,
    'Mid-range': 4000,
    Luxury: 8000,
  };
  
  const transportCost = {
    'Private Cab': 1500,
    'Public Transport': 300,
    'Self-Drive': 1000,
    'Train + Local': 400,
  };
  
  function pickDestinations(interests) {
    const interestToDest = {
      Heritage: ['Nalanda', 'Vikramshila University', 'Golghar & Patna'],
      Spiritual: ['Bodh Gaya', 'Rajgir', 'Vaishali'],
      Nature: ['Kakolat Waterfall', 'Rajgir'],
      Adventure: ['Valmiki Tiger Reserve', 'Rajgir'],
      Photography: ['Nalanda', 'Bodh Gaya', 'Rajgir'],
      Wildlife: ['Valmiki Tiger Reserve'],
      Food: ['Golghar & Patna', 'Bodh Gaya'],
      Culture: ['Vaishali', 'Golghar & Patna'],
    };
  
    const seen = new Set();
    const result = [];
    for (const interest of interests) {
      const dests = interestToDest[interest] || [];
      for (const d of dests) {
        if (!seen.has(d)) {
          seen.add(d);
          result.push(d);
        }
      }
    }
    return result.length > 0 ? result : ['Bodh Gaya', 'Nalanda', 'Rajgir'];
  }
  
  function buildDayPlan(dest) {
    const plans = {
      'Bodh Gaya': {
        morning: 'Dawn meditation at the Mahabodhi Temple and Bodhi Tree',
        afternoon: 'Visit international monasteries (Thai, Japanese, Bhutanese, Tibetan)',
        evening: 'Sunset at the Great Buddha Statue; dinner at a rooftop restaurant',
      },
      Nalanda: {
        morning: 'Explore the Nalanda University ruins with a guide',
        afternoon: 'Visit the Nalanda Archaeological Museum and Xuanzang Memorial Hall',
        evening: 'Drive to Rajgir (12 km); relax at the hot springs',
      },
      Rajgir: {
        morning: 'Ropeway ride to the Vishwa Shanti Stupa (Peace Pagoda)',
        afternoon: 'Walk the glass skywalk and explore the Nature Safari',
        evening: 'Hot spring dip at Brahmakund; dinner at a local dhaba',
      },
      'Golghar & Patna': {
        morning: 'Climb Golghar for panoramic Ganges views; visit Bihar Museum',
        afternoon: 'Walk the Marine Drive riverfront; visit Patna Sahib Gurudwara',
        evening: 'Litti chokha dinner at Boring Road; explore local markets',
      },
      'Valmiki Tiger Reserve': {
        morning: 'Early morning jeep safari through sal forests',
        afternoon: 'Bird watching and visit to Tharu tribal village',
        evening: 'Stay at the forest rest house; campfire dinner',
      },
      'Kakolat Waterfall': {
        morning: 'Drive to Kakolat; hike to the waterfall',
        afternoon: 'Swim in the natural pool; forest picnic',
        evening: 'Return to nearest town; dinner at a highway dhaba',
      },
      Vaishali: {
        morning: 'Visit the Ashokan Lion Pillar and Relic Stupa',
        afternoon: 'Explore the Vaishali Museum and nearby Kundalpur Jain site',
        evening: 'Drive back to Patna (55 km); dinner at Maurya Lok food court',
      },
      'Vikramshila University': {
        morning: 'Explore the excavated ruins of Vikramshila monastic complex',
        afternoon: 'Visit the central stupa and surrounding monk cells',
        evening: 'Drive to Bhagalpur city; dinner by the Ganga riverbank',
      },
    };
  
    return plans[dest] || {
      morning: 'Explore the local area and main attractions',
      afternoon: 'Visit nearby museums and cultural sites',
      evening: 'Dinner at a recommended local restaurant',
    };
  }
  
  export function generateItinerary(input) {
    const { days, budget, travellerType, interests, transport } = input;
    const selectedDestinations = pickDestinations(interests);
    const dailyBudget = budgetMap[budget] || 4000;
    const transportDaily = transportCost[transport] || 500;
  
    const dayPlans = [];
    let totalBudget = 0;
  
    for (let i = 0; i < days; i++) {
      const destIndex = i % selectedDestinations.length;
      const dest = selectedDestinations[destIndex];
      const isLastDay = i === days - 1;
      const isFirstDay = i === 0;
  
      const dayBudget = dailyBudget + transportDaily + (isFirstDay ? 1000 : 0);
      totalBudget += dayBudget;
  
      const { morning, afternoon, evening } = buildDayPlan(dest);
  
      dayPlans.push({
        day: i + 1,
        title: `Day ${i + 1} - ${dest}${isFirstDay ? ' (Arrival)' : ''}${isLastDay ? ' (Departure)' : ''}`,
        morning,
        afternoon,
        evening,
        meals: `Breakfast at hotel, lunch at a local restaurant, dinner at a recommended spot (~Rs ${Math.round(dailyBudget * 0.3)})`,
        budget: `Rs ${dayBudget.toLocaleString('en-IN')}`,
      });
    }
  
    const tips = [
      'Carry comfortable walking shoes - most sites involve significant outdoor walking.',
      'Book accommodations in advance, especially during October-March peak season.',
      "Keep cash handy - many local dhabas and smaller sites don't accept digital payments.",
      'Start early each day (7-8 AM) to beat the heat and crowds at major sites.',
    ];
  
    if (interests.includes('Spiritual')) {
      tips.push('Dress modestly when visiting temples and monasteries - shoulders and knees covered.');
    }
    if (interests.includes('Wildlife')) {
      tips.push('Book safaris at least a week in advance during peak winter months.');
    }
    if (travellerType === 'Solo') {
      tips.push('Use trusted cab apps or pre-booked drivers for intercity travel.');
    }
    if (travellerType === 'Family') {
      tips.push('Plan for rest breaks every 3-4 hours when traveling with children.');
    }
  
    return {
      days: dayPlans,
      totalBudget: `Rs ${totalBudget.toLocaleString('en-IN')}`,
      summary: `A ${days}-day ${budget.toLowerCase()} trip for ${travellerType.toLowerCase()} travellers, covering ${selectedDestinations.length} key destination${selectedDestinations.length > 1 ? 's' : ''} across Bihar, with a focus on ${interests.join(', ').toLowerCase()}.`,
      tips,
    };
  }
  