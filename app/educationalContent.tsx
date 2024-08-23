import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Video } from "expo-av";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

interface VideoTutorial {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const EducationalContent: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [videoTutorials, setVideoTutorials] = useState<VideoTutorial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      // Simulating API calls
      const blogPostsData = await fetchBlogPosts();
      const videoTutorialsData = await fetchVideoTutorials();
      const faqsData = await fetchFAQs();

      setBlogPosts(blogPostsData);
      setVideoTutorials(videoTutorialsData);
      setFaqs(faqsData);
    } catch (err) {
      setError("Failed to fetch content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogPosts = (): Promise<BlogPost[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "5 Tips for Healthy Skin",
            excerpt: "Discover the secrets to maintaining radiant and healthy skin...",
            imageUrl: "https://example.com/healthy-skin.jpg",
          },
          {
            id: "2",
            title: "Understanding Acne: Causes and Treatments",
            excerpt: "Learn about the root causes of acne and effective treatment options...",
            imageUrl: "https://example.com/acne-treatment.jpg",
          },
        ]);
      }, 1000);
    });
  };

  const fetchVideoTutorials = (): Promise<VideoTutorial[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            title: "Morning Skincare Routine",
            thumbnailUrl: "https://example.com/morning-routine-thumbnail.jpg",
            videoUrl: "https://example.com/morning-routine-video.mp4",
          },
          {
            id: "2",
            title: "How to Apply Sunscreen Correctly",
            thumbnailUrl: "https://example.com/sunscreen-thumbnail.jpg",
            videoUrl: "https://example.com/sunscreen-video.mp4",
          },
        ]);
      }, 1000);
    });
  };

  const fetchFAQs = (): Promise<FAQ[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            question: "How often should I exfoliate my skin?",
            answer: "It depends on your skin type, but generally 1-2 times a week is recommended...",
          },
          {
            id: "2",
            question: "What ingredients should I look for in a moisturizer?",
            answer: "Look for ingredients like hyaluronic acid, glycerin, and ceramides...",
          },
        ]);
      }, 1000);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchContent().then(() => setRefreshing(false));
  }, []);

  const renderBlogPosts = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>Blog Posts</ThemedText>
      {blogPosts.map((post) => (
        <TouchableOpacity key={post.id} style={styles.blogPost} onPress={() => router.push(`/blogPost/${post.id}`)}>
          <Image source={{ uri: post.imageUrl }} style={styles.blogImage} />
          <View style={styles.blogContent}>
            <ThemedText style={styles.blogTitle}>{post.title}</ThemedText>
            <ThemedText style={styles.blogExcerpt}>{post.excerpt}</ThemedText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderVideoTutorials = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>Video Tutorials</ThemedText>
      {videoTutorials.map((tutorial) => (
        <TouchableOpacity key={tutorial.id} style={styles.videoTutorial} onPress={() => router.push(`/videoTutorial/${tutorial.id}`)}>
          <Image source={{ uri: tutorial.thumbnailUrl }} style={styles.videoThumbnail} />
          <ThemedText style={styles.videoTitle}>{tutorial.title}</ThemedText>
          <Ionicons name="play-circle-outline" size={24} color={tintColor} style={styles.playIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderFAQs = () => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>FAQs</ThemedText>
      {faqs.map((faq) => (
        <View key={faq.id} style={styles.faqItem}>
          <ThemedText style={styles.faqQuestion}>{faq.question}</ThemedText>
          <ThemedText style={styles.faqAnswer}>{faq.answer}</ThemedText>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={tintColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <TouchableOpacity style={styles.retryButton} onPress={fetchContent}>
          <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={tintColor} />}
      >
        <ThemedText style={styles.pageTitle}>Educational Content</ThemedText>
        {renderBlogPosts()}
        {renderVideoTutorials()}
        {renderFAQs()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  scrollContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  blogPost: {
    flexDirection: "row",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  blogImage: {
    width: 100,
    height: 100,
  },
  blogContent: {
    flex: 1,
    padding: 10,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  blogExcerpt: {
    fontSize: 14,
    opacity: 0.7,
  },
  videoTutorial: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  videoThumbnail: {
    width: "100%",
    height: 200,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  playIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  faqItem: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  faqAnswer: {
    fontSize: 16,
    opacity: 0.8,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EducationalContent;
