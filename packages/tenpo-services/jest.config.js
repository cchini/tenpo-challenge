module.exports = {
	rootDir: "src",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(j|t)sx?$": "babel-jest",
	},
	moduleNameMapper: {
		"single-spa-react/parcel": "single-spa-react/lib/cjs/parcel.cjs",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
