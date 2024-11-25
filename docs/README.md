# Loopify - Music Song & Playlist Crowdsourcing Platform

**Team Members:** James Baker, Grace Thanglerdsumpan, Angie Cao, Jasper Zhu, Namita Sajai, Avi Upadhyaula

**Description:**  
Loopify is a music discovery platform that uses crowdsourcing to categorize songs into specific vibes. Users create theme-based playlist names, such as “road trip anthems” or “late-night thoughts,” and can vote on whether assigned songs fit the vibe. This platform allows users to collaboratively define playlist moods, making music discovery more community-driven and accurate.

---

## Project Overview

### Problem Statement

Loopify addresses the challenge of finding music that fits specific moods or themes, which can be limited in traditional, algorithm-driven music platforms. By integrating user-driven playlists with mood-based song matching, Loopify creates a personalized, community-centered music discovery experience.

### Project Type

Crowdsourcing platform

### Target Audience

Music lovers of all ages who enjoy exploring and sharing music through mood-specific playlists. This includes anyone from teens to adults who want a more curated way to find songs that match their mood.

### Incentives

Active users gain vibe-matched song recommendations and can earn badges like "Playlist Pro" or "Vibe Guru," rewarding participation and building a music-based community.

---

## Quality Control and Aggregation Implementation

Our quality control and aggregation modules can be found in `src/backend/quality_control.py` and `src/backend/aggregate.py` respectively.

### Quality Control Module (`quality_control.py`)

The quality control module implements a two-step approach to ensure data quality:

1. **Worker Quality Assessment**: 
   - Identifies low-quality workers by comparing their votes against majority opinions
   - Workers with agreement rates below 30% are flagged and their votes are filtered out
   - This helps remove potentially random or malicious voting patterns

2. **Song Validation**:
   - For each playlist, calculates the ratio of positive votes for each song
   - Songs must receive at least 60% positive votes to be considered valid for a playlist
   - Returns validated songs with their confidence scores

Future improvements planned:
- Implement weighted voting based on worker reputation
- Add time-based analysis to detect rapid, potentially low-quality submissions
- Include song metadata analysis to detect outliers

### Aggregation Module (`aggregate.py`)

The aggregation module processes validated song data to generate playlist recommendations:

1. **Data Processing**:
   - Takes validated songs from the QC module as input
   - Requires minimum 5 votes per song for consideration
   - Sorts songs by confidence scores within each playlist

2. **Recommendation Generation**:
   - Creates top 10 song recommendations for each playlist
   - Maintains confidence scores for all songs
   - Tracks total number of validated songs per playlist

Future improvements planned:
- Implement collaborative filtering for enhanced recommendations
- Add genre and mood-based weighting
- Include popularity metrics in aggregation logic

---

## Project Components

### 1. **User Interface (UI) and User Experience (UX)**

**Point Value:** 3  
**Description:**  
Loopify's UI/UX is essential for user engagement, enabling users to interact with vibe-based playlists, vote on songs, and tag songs according to moods. An intuitive design encourages more participation.

**Milestones:**

- Design wireframes for main screens: Playlist Discovery, Song Voting, and Playlist Creation.
- Build interactive elements for playlist creation and voting.
- Gather and apply user feedback to optimize layout and usability.

### 2. **Playlist Curation and Voting System**

**Point Value:** 4  
**Description:**  
This component allows users to create, tag, and vote on playlists based on specific moods or themes. A community voting system ensures high-quality recommendations by highlighting top-voted playlists.

**Milestones:**

- Implement tagging and playlist creation system.
- Build a voting mechanism for playlist and song validation.
- Add moderation features to maintain quality and relevance.

### 3. **Recommendation AI**

**Point Value:** 4  
**Description:**  
The AI recommendation engine uses user input to suggest songs that match popular vibes, refining recommendations based on voting patterns.

**Milestones:**

- Develop a machine learning model to suggest songs based on community-curated themes.
- Incorporate feedback loops to improve recommendation accuracy.
- Fine-tune the model to enhance vibe matching precision.

### 4. **Gamification and Rewards System**

**Point Value:** 2  
**Description:**  
Loopify includes badges and reputation points to incentivize participation. Badges like "Vibe Guru" or "Playlist Pro" recognize user contributions.

**Milestones:**

- Design badge system and establish tiers (e.g., Playlist Curator, Mood Expert).
- Implement points system for user recognition.
- Define thresholds for badge achievements.

### 5. **Quality Control and Moderation**

**Point Value:** 2  
**Description:**  
Quality control tools let users report "off-vibe" tags, ensuring that playlists remain on-theme and accurate.

**Milestones:**

- Build tools for flagging irrelevant content.
- Require a minimum upvote threshold for playlists to be published.
- Use moderation to remove misfit songs and playlists based on community feedback.

### 6. **Backend Infrastructure and Data Management**

**Point Value:** 3  
**Description:**  
A robust backend infrastructure supports playlist data management, user voting, and AI model data, ensuring scalability for high user activity.

**Milestones:**

- Set up a scalable database to store playlists, tags, and votes.
- Develop APIs to handle data fetching and posting.
- Optimize database performance for real-time user interactions.

### 7. **Analytics and Metrics Tracking**

**Point Value:** 2  
**Description:**  
This component tracks user engagement, playlist quality, and recommendation accuracy, enabling Loopify to evaluate its success.

**Milestones:**

- Track metrics like playlist votes, recommendation accuracy, and retention rates.
- Create analytics dashboards to monitor engagement and playlist quality.
- Implement feedback mechanisms to improve the AI model.

**Total Point Value:** 20

---

## Implementation Workflow

1. **Frontend and Backend Setup** - Initialize basic UI and backend infrastructure.
2. **Playlist Curation System** - Develop the core features for playlist tagging and voting.
3. **AI Recommendation Engine** - Train the AI model with initial user data.
4. **Gamification and Quality Control** - Add badge and moderation systems.
5. **Data Management and Optimization** - Build robust backend data handling for real-time interactions.
6. **Analytics Integration** - Track and analyze user engagement and feedback.

---

## Evaluation Criteria

Loopify's success will be measured by:

- **User Engagement:** Number of active users and playlist contributors.
- **Recommendation Quality:** Accuracy of vibe-matched playlists based on user feedback.
- **Content Quality:** Effectiveness of moderation in maintaining playlist relevance.
- **Retention Rates:** Long-term user engagement and repeat visits.

---

## Potential Challenges

- **Voting System Misuse:** Risk of users voting for popular songs rather than vibe-specific matches.
- **AI Limitations:** Ensuring the recommendation model accurately captures nuanced moods.
- **Data Scaling:** Managing a large volume of user contributions without compromising performance.

---

## Code Structure/Walkthrough

- **/backend** This folder contains the `aggregate.py`, `demo.py`, and `quality_control.py` functions; implementing the logic needed to complete the aggregation and QC logic.
In order to run these folders, make sure you're currently in the folder (`cd backend`) and call `python3 file_name.py`. In this casem `file_name.py` would be either `aggregate.py`, `demo.py`, or `quality_control.py`.
- **/data** This folder *currently* contrains the test data, but we plan to include all relevant data as .csv files inside this folder as well.
- **/docs** This folder contains relevant submission files related to the screenshot mockups, flowcharts, and this README.md file.
- **/frontend** This folder contains all files related to rendering and running the frontend of our web-app. The `/public` folder contains images and icons related , while the `/src` file contains codes in Javascript and CSS that uses React to render and style different frontend components of Loopify.
In order to run this, make sure that you're currently in the folder (`cd frontend`), then use node to run:
`npm install`
`npm start`.

# **Loopify User Guide: How to Help Crowdsourcing Playlists**

Welcome to **Loopify**, where your music expertise helps shape collaborative playlists! Whether you’re a seasoned playlist curator or just a music enthusiast, this step-by-step guide will show you how to contribute effectively to our crowdsourcing efforts. Let’s get started!

---

## **What You’ll Be Doing**

Loopify allows you to:

1. Select a playlist category (e.g., "hitting the gym").
2. Vote on whether specific songs fit that playlist.
3. Help create a vibe-packed playlist for the community!

Your input will directly impact the final playlists shared with Loopify users.

---

## **How to Get Started**

### **Step 1: Visit the Loopify Platform**

1. Open your browser and navigate to **[Loopify](http://localhost:3000)**.
2. You’ll land on the **Home Page**, which displays playlist categories and a search bar.

---

### **Step 2: Select a Playlist**

#### **Option 1: Use the Search Bar**
1. In the search bar, type a keyword related to a playlist you’d like to contribute to (e.g., "gym" or "breakup").
2. Select the desired playlist from the dropdown menu.
3. Click the **Vote** button to start voting on songs for that playlist.

#### **Option 2: Choose from the Playlist Cards**
1. Scroll down to see the playlist categories displayed as cards.
2. Click on the card that matches your desired playlist category.
3. You’ll be redirected to the voting interface for that playlist.

---

### **Step 3: Vote on Songs**

1. **Listen to the Song Preview:**
   - If a song has a preview, you can listen to it directly on the platform by clicking the play button in the embedded audio player.
   - If no preview is available, click the **Listen on Spotify** link to hear the full song.

2. **Cast Your Vote:**
   - Click **Yes** if the song fits the playlist’s theme.
   - Click **No** if the song doesn’t match the playlist’s vibe.
   - If you’re unsure, click **Skip** to move on to the next song.

3. After voting, the platform will automatically load the next song for your feedback.

---

### **Step 4: Repeat and Contribute**

- Continue voting on as many songs as you like.
- You can revisit other playlists anytime by clicking the **Back** button or navigating to the **Home Page**.

---

## **Need Help?**

### **Common Issues and Solutions**

#### **I Can’t Hear the Song Preview**
- Make sure your device’s volume is not muted.
- If the song preview isn’t available, click the **Listen on Spotify** link to hear the full track.

#### **The Platform is Not Loading**
- Ensure your internet connection is stable.
- Refresh the page or try accessing the platform on a different browser (e.g., Chrome, Firefox).

#### **I Selected the Wrong Playlist**
- Click the **Back** button at the top left corner to return to the Home Page.
- Choose a different playlist from the cards or search bar.

---

### **Contact Us**

If you encounter issues or have questions, don’t hesitate to reach out:

- **Email**: namitas@upenn.edu

---

## **Why Your Contribution Matters**

Your input helps us crowdsource the ultimate playlists for every mood, activity, and vibe. Each vote you cast brings us closer to creating the perfect listening experience for our community.

Thank you for helping build the music magic on Loopify! 🎶

--- 
