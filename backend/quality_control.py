import pandas as pd
import numpy as np

class QualityControl:
    def __init__(self, threshold=0.6):
        """
        Initialize QC module with a threshold for song acceptance.
        
        Args:
            threshold (float): Minimum ratio of positive votes needed (default: 0.6)
        """
        self.threshold = threshold
        
    def validate_songs(self, votes_df):
        """
        Validate songs for each playlist based on user votes.
        
        Args:
            votes_df (pd.DataFrame): DataFrame containing vote data
            
        Returns:
            dict: Dictionary of playlists with validated songs
        """
        # First identify and filter out low quality workers
        low_quality_workers = self.identify_low_quality_workers(votes_df)
        filtered_votes_df = votes_df[~votes_df['Worker_Session_ID'].isin(low_quality_workers)]
        
        # Get unique playlists
        playlists = filtered_votes_df['Playlist'].unique()
        
        # Dictionary to store results
        validated_songs = {}
        
        for playlist in playlists:
            # Get votes for this playlist
            playlist_votes = filtered_votes_df[filtered_votes_df['Playlist'] == playlist]
            
            # Calculate vote ratios for each song
            song_columns = playlist_votes.columns[2:]  # Skip Worker_Session_ID and Playlist
            song_votes = {}
            
            for song in song_columns:
                if song.startswith('Unnamed:'):
                    continue
                    
                votes = playlist_votes[song].value_counts(normalize=True)
                positive_ratio = votes.get('y', 0)
                
                if positive_ratio >= self.threshold:
                    song_votes[song] = positive_ratio
            
            # Store validated songs for this playlist
            validated_songs[playlist] = {
                'songs': list(song_votes.keys()),
                'confidence_scores': song_votes
            }
            
        return validated_songs
    
    def identify_low_quality_workers(self, votes_df, agreement_threshold=0.3):
        """
        Identify potentially low-quality workers based on agreement with majority.
        
        Args:
            votes_df (pd.DataFrame): DataFrame containing vote data
            agreement_threshold (float): Minimum agreement ratio required
            
        Returns:
            list: List of worker IDs flagged for low quality
        """
        worker_agreements = []
        song_columns = [col for col in votes_df.columns if not col.startswith('Unnamed:')][2:]
        
        for _, worker_votes in votes_df.iterrows():
            agreements = 0
            total_votes = 0
            
            for song in song_columns:
                # Skip if worker didn't vote
                if pd.isna(worker_votes[song]):
                    continue
                    
                # Get majority vote for this song in this playlist
                playlist_votes = votes_df[votes_df['Playlist'] == worker_votes['Playlist']][song]
                majority_vote = playlist_votes.mode()[0]
                
                if worker_votes[song] == majority_vote:
                    agreements += 1
                total_votes += 1
            
            if total_votes > 0:
                agreement_ratio = agreements / total_votes
                if agreement_ratio < agreement_threshold:
                    worker_agreements.append(worker_votes['Worker_Session_ID'])
                    
        return worker_agreements
