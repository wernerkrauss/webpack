<section class="section-compact">
    <div class="container">
        <div class="row">
            <% if $ShowTitle %>
                <div class="col-md-12">
                    <h2>$Title</h2>
                </div>
            <% end_if %>
            <div class="col-md-12 posts">
                <div class="posts-container">
                    <div class="posts-test-bgimage"></div>
                    <% loop $Posts %>
                        <div class="post-single">
                            <% if $VideoURL %>
                               <% include Video %>
                            <% end_if %>
                            <% if not $VideoURL %>
                                <img class="post-single-image" src="$Image" alt="" style="width:300px;">
                            <% end_if %>
                            <br>
                            $Message
                            <br>
                            $CreatedAt
                            <hr>
                        </div>
                    <% end_loop %>
                </div>
                <div class="posts-buttons">
                    <button type="button" class="btn btn-primary posts-loadmore">Load More</button>
                </div>
            </div>
        </div>
    </div>
</section>