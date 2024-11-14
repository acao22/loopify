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
    
