import pandas as pd
from quality_control import QualityControl
from aggregate import PlaylistAggregator

def main():
    # Load and clean the test data
    df = pd.read_csv('../data/testData.csv')
    
    # Remove unnamed columns
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    
    # Initialize QC and Aggregator
    qc = QualityControl(threshold=0.6)  # 60% threshold for song acceptance
    aggregator = PlaylistAggregator(min_votes=5)
    
    # Run quality control
    validated_songs = qc.validate_songs(df)
    
    # Aggregate the validated songs
    playlist_recommendations = aggregator.aggregate_playlist_data(validated_songs)
    
    # Print results
    print("\n=== Playlist Recommendations ===")
    for playlist, data in playlist_recommendations.items():
        print(f"\n{playlist}:")
        print("Top 10 Songs:")
        for i, song in enumerate(data['top_songs'], 1):
            confidence = data['confidence_scores'][song]
            print(f"{i}. {song} (confidence: {confidence:.2f})")
        print(f"Total validated songs: {data['total_songs']}")
    
    # Get worker quality metrics
    low_quality_workers = qc.identify_low_quality_workers(df)
    if low_quality_workers:
        print("\n=== Low Quality Workers ===")
        print(f"Found {len(low_quality_workers)} workers with low agreement rates")
        print("Worker IDs:", low_quality_workers)

if __name__ == "__main__":
    main()