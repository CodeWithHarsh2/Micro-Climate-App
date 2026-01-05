import pandas as pd
import numpy as np

print("Starting Micro-Climate Analysis")

# Load CSV FIRST
df = pd.read_csv("analysis/data/weatherHistory.csv")

# Now it is safe to inspect the data
print("Columns in dataset:")
print(df.columns)

# Basic info
print("\nDataset shape (rows, columns):")
print(df.shape)

print("\nMissing values percentage:")
print(df.isna().mean() * 100)

target = "Apparent Temperature (C)"

features = [
    "Temperature (C)", "Humidity", "Wind Speed (km/h)", "Visibility (km)",
    "Pressure (millibars)"
]

X = df[features]
y = df[target]
X = X.fillna(method="ffill")
y = y.fillna(method="ffill")

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np

X_train, X_test, y_train, y_test = train_test_split(X,
                                                    y,
                                                    test_size=0.2,
                                                    random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

predictions = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, predictions))

print("\nRMSE:", rmse)
