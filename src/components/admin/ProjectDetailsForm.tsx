
// Fix the media insertion
const { error: mediaError } = await supabase
  .from("project_media")
  .insert(media.map(item => ({
    project_id: projectId,
    media_type: item.media_type || "image", // Ensure media_type is always set
    media_url: item.media_url || "", // Ensure media_url is always set
    display_order: item.display_order || 0
  })));

// Fix the features insertion
const { error: featuresError } = await supabase
  .from("project_features")
  .insert(features.map(item => ({
    project_id: projectId,
    feature_type: item.feature_type || "غرفة خادمة", // Ensure feature_type is always set
    amount: item.amount || 1
  })));
