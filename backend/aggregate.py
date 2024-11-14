import pandas as pd
import numpy as np
from collections import defaultdict

class PlaylistAggregator:
    def __init__(self, min_votes=5):
        """
        Initialize aggregator with minimum votes threshold.
        
        Args:
            min_votes (int): Minimum number of votes required for consideration
        """
        self.min_votes = min_votes
        
    def aggregate_playlist_data(self, validated_songs):
        """
        Aggregate validated song data into playlist recommendations.
        
        Args:
            validated_songs (dict): Dictionary of validated songs per playlist
            
        Returns:
            dict: Aggregated playlist recommendations
        """
        playlist_recommendations = {}
        
        for playlist, data in validated_songs.items():
            # Sort songs by confidence score
            sorted_songs = sorted(
                data['confidence_scores'].items(),
                key=lambda x: x[1],
                reverse=True
            )
            
            # Create recommendation object
            playlist_recommendations[playlist] = {
                'top_songs': [song for song, _ in sorted_songs[:10]],
                'confidence_scores': {song: score for song, score in sorted_songs},
                'total_songs': len(sorted_songs)
            }
            
        return playlist_recommendations
    
    # angie added this
    def update_vote(worker_id, playlist, song, vote):
        df = pd.read_csv('data/testData.csv')
        # filter for specified playlist & worker
        playlist_data = df[(df['Worker_Session_ID'] == worker_id) & (df['Playlist'] == playlist)]

        # update vote in df
        if not playlist_data.empty and song in playlist_data.columns:
            df.loc[playlist_data.index, song] = vote
            # save back to csv
            df.to_csv('data/testData.csv', index=False)
            return {'message': 'Vote updated successfully'}
        else:
            return {'message': 'Playlist or song not found for worker'}
