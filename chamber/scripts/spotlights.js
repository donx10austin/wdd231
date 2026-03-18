async function getSpotlightMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    
    // Access the array inside the 'members' key
    const allMembers = data.members;

    // 1. FILTER: Only Gold and Silver
    const qualifiedMembers = allMembers.filter(member => 
        member.membershipLevel === "Gold" || member.membershipLevel === "Silver"
    );

    // 2. SHUFFLE: Randomize
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

    // 3. SELECT: Pick 2 or 3
    const spotlightMembers = shuffled.slice(0, 3);

    // 4. DISPLAY: Call your function to build the HTML cards
    displaySpotlights(spotlightMembers);
}

getSpotlightMembers();