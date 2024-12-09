import pandas as pd
import pymongo
import random
import string

# MongoDB connection + CSV
MONGO_URI= "mongodb+srv://angiecao:6W0tmz2dbWsDzZDR@loopifycluster.ducae.mongodb.net/loopify?retryWrites=true&w=majority"
DATABASE_NAME = "loopify"  
COLLECTION_NAME = "votes" 
CSV_FILE_PATH = "../data/googleFormData.csv"

def generate_id():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=24))

def process_row(row, columns):
    playlists = {}
    for col in columns:
        # getting song & playlist from column name
        if "[" in col and "]" in col:
            song, playlist = col.split("[")
            song = song.strip().replace("\\n", " ").strip()
            playlist = playlist.replace("]", "").strip()
            vote_raw = row[col]
            if pd.isna(vote_raw) or "Unsure" in str(vote_raw):  
                continue
            vote = "yes" if "Agree" in vote_raw else "no" if "Disagree" in vote_raw else None
            if vote:
                if playlist not in playlists:
                    playlists[playlist] = []
                playlists[playlist].append({
                    "song": song,
                    "vote": vote,
                    "_id": generate_id()
                })
    return playlists

# def process_votes(row, columns):
#     formatted_votes = []
#     for col in columns:
#         if "[" in col and "]" in col:
#             song, playlist = col.split("[")
#             song = song.strip().replace("\\n", " ").strip()
#             playlist = playlist.replace("]", "").strip()
#             vote_raw = row[col]
#             # skipping NaN & "unsure" votes
#             if pd.isna(vote_raw) or "Unsure" in str(vote_raw):  
#                 continue
#             if "Agree" in vote_raw:
#                 vote = "yes"
#             elif "Disagree" in vote_raw:
#                 vote = "no"
#             else:
#                 continue
#             formatted_votes.append({
#                 "song": song,
#                 "vote": vote,
#                 "_id": generate_id()
#             })
#     return formatted_votes

# processing csv
csv_data = pd.read_csv(CSV_FILE_PATH)
# don't need timestamp and email addy
votes_data = csv_data.iloc[:, 2:] 

formatted_data = []
for index, row in votes_data.iterrows():
    # simple worker_id for google form
    worker_id = str(index + 1)
    playlists = process_row(row, votes_data.columns)
    for playlist, votes in playlists.items():
        formatted_data.append({
            "workerId": worker_id,
            "playlist": playlist,
            "votes": votes,
        })

# testing
print("Formatted Data:")
print(formatted_data[6])


def insert_to_mongodb(data):
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    result = collection.insert_many(data)
    print(f"Inserted {len(result.inserted_ids)} documents into MongoDB.")

# running script BUT WHOEVERS READING THIS DONT RUN IN AGAIN I ALR DID
if __name__ == "__main__":
    print("Processing complete. Displaying formatted data...")
    insert_to_mongodb(formatted_data)
