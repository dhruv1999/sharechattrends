# STEP 1: Collect data (15 min, 1 hr, 24 hrs)
    Collect: Text, Image/Video, Hashtags, Comments, Likes, Views
    External Signals: Facebook Tier-2/3 public pages | Google Trends (higher weight for Hindi belt) | Hindi news websites
    Total Trend Signal = 0.75(Internal Signals) + 0.25(External Signals)
    Tech: ShareChat internal data | Google Trends API | Facebook Graph API | Hindi news scraper (Dainik Bhaskar, Navbharat Times)
    Reason: Trends may start outside ShareChat before users begin posting


# STEP 2: Filter content
    Remove: Unsafe/inappropriate content + exact/near-duplicate posts
    Tech: Google Vision SafeSearch + similarity checks
    Detect: Adult content | Violence | Unsafe/Spoof content


# STEP 3: Extract topics
    Extract: People | Events | Movies | Festivals | Politics | Locations
    Example: Dhoni / MSD / धोनी → Same topic
    Tech: Google Natural Language API → Person, Location, Event, Work-of-art extraction


# STEP 4: Group similar topics
    Merge similar discussions
    Example: टीएन चुनाव 2025 / तमिलनाडु चुनाव 2025 → तमिलनाडु चुनाव 2025
    Tech: OpenAI Embeddings API + Pinecone vector DB


# STEP 5: Extract Top 10 Trending Topics
    Trend Score: 
        0.35= UniqueUsers
        0.25= Likes+Comments
        0.20= Views
        0.20= Searches

    Signals: Unique users | Engagement | Views | Searches
    Reason: Unique users prevent a few users/bots from manipulating trends



# STEP 6: Generate tags
    Use canonical topic names + auto generate hashtags if missing
    Example: तमिलनाडु विधानसभा चुनाव 2025 → #तमिलनाडुविधानसभाचुनाव2025
    Tech: Google Knowledge Graph 


# STEP 7: Add metadata
    Category:
        Inputs: Hashtag, Post text, External news context
        Tech: GPT-5 for category extraction

    Heat Score (out of 100): 0.75(Internal Signals) + 0.25(External Signals)
        Internal Signals: Posts | Likes | Comments | Views
        External Signals: Facebook | Google Trends | Hindi news

    Description: "Voting starts in U.P today"
        Internal Signals: Top posts | Common keywords
        Tech: GPT-5




# UX Rationale-

    Trends with images in different sizes

    Why?

        Higher CTR and engagement
        Visual content naturally draws attention and can increase click through rates compared to text only lists.


        Faster clicks on tags
        Users can identify a trend instantly through images (celebrity, sports event, festival, election, movie poster) without reading every title.


        Reduces wrong clicks
        Larger thumbnails + visual context help users distinguish between similar trends and reduce accidental taps.
        Improves scanability


        Increases content exploration
        Different card sizes create visual variety and can encourage users to explore beyond the top trend instead of clicking only item #1.


    What did I optimize for?
        Fast trend discovery- Users should understand and identify interesting trends within a few seconds without reading long text.


    What did I reject-
        1. Equal size pictures for trends- Rejected because it looks monotonus and is not appealing.

        2. Swipe card- User can swipe left and right with trend in big text with tags. Difficult to understand on how to use for targeted persona of sharechat with tier 2/3 audience.




# Weeks Roadmap

## End User Pain Points

    1. Users cannot easily discover trends relevant to their location

        Current trending topics may be too broad and not reflect local interests.

        Solution: Location based trends

            Add location selection during onboarding/settings
            Allow user to select location in trend sections

            Impact -> Very High    Effort-> Low     Priority-> P1   


    2. Many trends are not aligned with user interests

        Users interested in sports may see politics-heavy feeds and vice versa.

        Solution: Personalization

            Allow users to select preferred categories
            Show top trends from selected interests

            Impact -> High    Effort-> Medium     Priority-> P2 



## Admin Pain Points

    1. High effort required to identify spam/manipulated trends

        Even with ranking systems and external signals, coordinated bot activity can still create fake spikes. Admins spend time manually investigating suspicious trends.

        Solution: Spam Score 
            If confidence falls below a threshold (e.g., <50%) automatically remove the trend from ranking or route it for manual review.

            Impact -> High  Effort-> Medium     Priority-> P2


    2. Insufficient context for trend approval

        A six-word description often lacks enough information for admins to confidently approve a trend.

        Current behavior:
        Admin opens Google, checks multiple sources, and spends extra time understanding context.

        Solution: AI-generated contextual explanation

            Display:

            Why is this trending?

            "Voting starts today in Uttar Pradesh. Google searches increased 180%, Facebook regional pages saw a spike, and news mentions rose significantly over the last 24 hours."

            Impact-> Very High   Effort-> Medium   Priority-> P1




